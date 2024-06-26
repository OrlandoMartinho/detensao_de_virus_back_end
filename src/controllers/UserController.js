const db = require('../config/dbConfig');
const jwt = require('jsonwebtoken');
const secretKey = require('../private/secretKey.json');
const token = require('../utils/token');
const dbPromise = db.promise();



const UsersController = {

    // Método para cadastrar usuário com o código de verificação
    cadastrarUsuario: async (req, res) => {
        const {nome} = req.body;
        // Verificar se todos os campos obrigatórios estão presentes
        if (!nome) {
            return res.status(400).json({ Mensagem: "Campos incompletos" });
        }
              
        const selectQuery='SELECT * FROM  usuarios  WHERE  nome = ?'
                //Verifica se o email já está em uso
        db.query(selectQuery,[nome],async (err,result)=>{

            if(err){
                console.log(" Erro:"+err.message)
                return res.status(500).json({Mensagem:"Erro interno do servidor"})
            } 
          
            if(result.length>0){
                const accessToken = jwt.sign({ id_usuario: result[0].id_usuario,nome: result[0].nome,protecao:result[0].protecao}, secretKey.secretKey);
                return res.status(200).json({Mensagem:"Usuário já está cadastrado",accessToken:accessToken,protecao:0}) 
            }
            const createQuery = "INSERT INTO usuarios (nome) VALUES (?)";
                        
            db.query(createQuery,[nome],(err,resultt)=>{

                if(err){
                    console.log("Erro :"+err)
                    return res.status(500).json({Mensagem:"Erro interno do servidor "})
                }
                   console.log(nome)           
                   const accessToken = jwt.sign({ id_usuario: resultt.insertId,nome:nome,protecao:0}, secretKey.secretKey);

                   return res.status(201).json({ Mensagem: "Usuário cadastrado com sucesso",accessToken:accessToken,protecao:0});
    
             })
        })
    },
    eliminarUsuario: async (req, res) => {
        const { accessToken } = req.body;
        const id_usuario = await token.usuarioId(accessToken);
    
            // Verifica se o ID do usuário é válido
        if (!id_usuario){
            return res.status(401).json({ mensagem: 'Token inválido' });
        }
        console.log(id_usuario)
            // Query para eliminar o usuário da tabela usuarios
        const deleteUsuarioQuery = 'DELETE FROM usuarios WHERE id_usuario = ?';
    
            // Executa a query para eliminar o usuário
        db.query(deleteUsuarioQuery, [id_usuario], (err, result) => {
            if (err) {
                console.error('Erro ao eliminar usuário:', err);
                return res.status(500).json({ mensagem: 'Erro ao eliminar usuário', erro: err });
            }
    
                // Verifica se o usuário foi eliminado com sucesso
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }
             return  res.status(200).json({ mensagem: 'Usuário eliminado com sucesso' });
        })
    },
    gerirProtecao: async (req, res) => {
        const { accessToken } = req.body;
    
   
            const id_usuario = await token.usuarioId(accessToken);
    
            // Verifica se o ID do usuário é válido
            if (!id_usuario) {
                return res.status(401).json({ mensagem: 'Token inválido' });
            }
    
            const protecaoAtual = await token.usuarioProtecao(accessToken);
            const novoValorProtecao = protecaoAtual === 0 ? 1 : 0;
    
            const updateQuery = 'UPDATE usuarios SET protecao = ? WHERE id_usuario = ?';
            const valores = [novoValorProtecao, id_usuario];
    
            db.query(updateQuery, valores, (err, result) => {
                if (err) {
                    console.log("Erro:", err.message);
                    return res.status(500).json({ mensagem: "Erro interno do servidor" });
                }
    
                const novoAccessToken = jwt.sign({ id_usuario: id_usuario, nome: req.body.nome, protecao: novoValorProtecao }, secretKey.secretKey);
    
                const updateTokenQuery = 'UPDATE usuarios SET token = ? WHERE id_usuario = ?';
                const tokenParams = [novoAccessToken, id_usuario];
    
                db.query(updateTokenQuery, tokenParams, (err, result) => {
                    if (err) {
                        console.error('Erro ao atualizar usuário:', err);
                        return res.status(500).json({ mensagem: "Erro interno do servidor" });
                    }
    
                    return res.status(201).json({ mensagem: "Proteção atualizada com sucesso", accessToken: novoAccessToken, protecao: novoValorProtecao });
                });
            });

    }
    ,
    obterUmUser:async(req,res)=>{
        const { accessToken } = req.body;
        const id_usuario=token.usuarioId(accessToken)
        const selectQuery = 'SELECT * FROM usuarios WHERE id_usuario = ?';
        const [usuario] =await dbPromise.query(selectQuery, [id_usuario]) 
        return  res.status(200).json({ usuario:usuario[0] });   
    }

    }

module.exports = UsersController;
