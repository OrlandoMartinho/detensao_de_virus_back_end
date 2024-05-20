const db = require('../config/dbConfig');
const token = require('../utils/token');

const sitesController = {
    // Método para cadastrar um novo contato
    cadastrarsites:async(req,res)=>{

        const { accessToken, nome,url} = req.body;
        const id_usuario = token.usuarioId(accessToken)
                if(!accessToken||!nome||!url||!id_usuario){
                    return res.status(400).json({Mensagem:"Verifique os campos e tente novamente"})
                }
                let seguro = 0
                let verificado = 0
                if(token.usuarioProtecao(accessToken)===0){
                    verificaURLVirusTotal(url)            
                        .then(result => {
                            if (result === true) {
                                console.log("A URL é segura de acordo com o VirusTotal.");
                                verificado=1
                            } else if(result === false) {
                                console.log("A URL pode representar uma ameaça de segurança de acordo com o VirusTotal ");
                                seguro = 1
                                verificado=1
                            } else {
                                console.log("Houve um erro ao analisar. Por favor, tente novamente.");
                                return res.status(400).json({mensagem:"Verifica a internet ou formate bem a url"})
                            }

                            const insertQuery='INSERT INTO sites (nome,url,seguro,verificado,id_usuario) values (?,?,?,?,?)'
                            db.query(insertQuery,[nome,url,seguro,verificado,id_usuario],(err,results)=>{
                                if(err){
                                    console.log("Erro:",err.message)
                                    return res.status(500).json({mensagem:"Erro interno do servidor"})
                                }

                                return res.status(200).json({mensagem:"Site  registrado com sucesso"})

                            })

                        })
                        .catch(error => {
                            console.error("Ocorreu um erro:", error);
                        });


                }else{
                    const insertQuery='INSERT INTO sites (nome,url,seguro,verificado,id_usuario) values (?,?,?,?,?)'
                    db.query(insertQuery,[nome,url,seguro,verificado,id_usuario],(err,results)=>{
                        if(err){
                            console.log("Erro:",err.message)
                            return res.status(500).json({mensagem:"Erro interno do servidor"})
                        }

                            return res.status(200).json({mensagem:"Site  registrado com sucesso",id_site:results.insertId,seguro:seguro})

                        })
                }
    }
    ,
    listarsites: async (req, res) => {
        const { accessToken } = req.body;
        const id_usuario = token.usuarioId(accessToken)
        if(!id_usuario||!accessToken){
            return res.status(400).json({Mensagem:"Verifique os campos e tente novamente"})
        }

        const selectQuery = 'SELECT * FROM sites WHERE id_usuario';
        db.query(selectQuery,[id_usuario] ,(err, result) => {
            if (err) {
                console.log("Erro:"+err.message)
                return res.status(500).json({ erro: "Erro interno do servidor" });
            }

            if (result.length > 0) {
                return res.status(200).json({ sites: result });
            } else {
                return res.status(404).json({ Mensagem: "Sem sites para este usuário" });
            }
        });
    },
    // Método para obter um contato por ID
    obtersitesPorId: async (req, res) => {
        const { accessToken, id_site } = req.body;
        const id_usuario = token.usuarioId(accessToken);
        
        if(!id_site||!accessToken){
            return res.status(400).json({Mensagem:"Complete bem os campos"})
        }
        if (!id_usuario) {
            return res.status(401).json({ mensagem: 'Tokens inválidos' });
        }

        const selectQuery = 'SELECT * FROM sites WHERE id_site = ? AND id_usuario = ?';
        db.query(selectQuery, [id_site,id_usuario], (err, result) => {
            if (err) {
                console.log("Erro:"+err.message)
                return res.status(500).json({ erro: "Erro interno do servidor" });
            }

            if (result.length > 0) {
                return res.status(200).json(  result[0] );
            } else {
                return res.status(404).json({ Mensagem: "site não encontrada" });
            }
        });
    },
    // Método para eliminar um contato
    eliminarsitesPeloId: async (req, res) => {
        const { accessToken, id_site} = req.body;
        const id_usuario = token.usuarioId(accessToken);

        if(!id_site||!accessToken){
            return res.status(400).json({Mensagem:"Complete bem os campos"})
        }

        if (!id_usuario) {
            return res.status(401).json({ mensagem: 'Tokens inválidos' });
        }

        const deletesites = 'DELETE FROM sites WHERE id_site = ? AND id_usuario=?';

        db.query(deletesites, [id_site,id_usuario], (err, result) => {
            if (err) {
                console.log("Erro:"+err.message)
                return res.status(500).json({ mensagem: 'Erro ao eliminar site'});
            }

            if (result.affectedRows > 0) {
                return res.status(200).json({ mensagem: 'Site eliminado com sucesso' });
            } else {
                return res.status(404).json({ Mensagem: "Site não encontrado" });
            }
        });
    },
   
};

module.exports = sitesController;
