const db = require('../config/dbConfig');
const token = require('../utils/token');

const notificacoesController = {
    // Adiciona uma notificação para um médico ou usuário com base no accessToken fornecido
    addNotificacao:async (req,res) => {
        const { accessToken,descricao,titulo } = req.body;
        const id_usuario = token.usuarioId(accessToken)
        if(!id_usuario||!accessToken||!descricao||!titulo){
            return res.status(400).json({Mensagem:"Verifique os campos e tente novamente"})
        }

        if(!await token.verificarTokenUsuario(accessToken)){
            return res.status(401).json({Mensagem:"Token inválido"})
        }
       
        try {
          
                const inserirNotificacao = `INSERT INTO notificacoes (titulo,descricao,id_usuario) VALUES (?,?,?)`;
                db.query(inserirNotificacao, [titulo,descricao,id_usuario], (err, result) => {
                    if (err) {
                        console.error('Erro ao armazenar a notificação para o usuário:', err.message);
                        
                        return res.status(500).json({Mensagem:"Erro interno do servidor"});
                    }
                    return res.status(200).json({Mensagem:"Notificação adicionada com sucesso"});;
                });
             
        } catch (error) {
            console.error('Erro ao decodificar o token do usuário:', error.message);
            return res.status(500).json({Mensagem:"Erro interno do servidor"});
        }
    },
    // Obtém todas as notificações de um médico ou usuário com base no accessToken fornecido
    obterTodasNotificacoes: async (req, res) => {

        const { accessToken } = req.body;
        const id_usuario = token.usuarioId(accessToken)
        if(!id_usuario||!accessToken){
            return res.status(400).json({Mensagem:"Verifique os campos e tente novamente"})
        }

        if(!await token.verificarTokenUsuario(accessToken)){
            return res.status(401).json({Mensagem:"Token inválido"})
        }

            const selectQuery2 = "SELECT * FROM notificacoes where id_usuario";
            db.query(selectQuery2,[id_usuario],(err,result)=>{
                
                if(err){
                    console.log("Erro:"+err.message)
                    return res.status(500).json({Mensagem:"Erro interno do servidor"})
                }
                return res.status(200).json({Notificacoes:result})
            })
        
    },
 
   
};

module.exports = notificacoesController;
