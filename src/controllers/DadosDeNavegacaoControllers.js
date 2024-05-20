const db = require('../config/dbConfig');
const token = require('../utils/token');


const dados_de_navegacaoController = {
    addDados: async (req, res) => {
        const { accessToken, id_site } = req.body;
        const id_usuario = token.usuarioId(accessToken);
    
        if (!id_usuario || !accessToken || !id_site) {
            return res.status(400).json({ mensagem: "Verifique os campos e tente novamente" });
        }
        console.log(id_usuario)
        const dados = req.body;
        let chaves = Object.keys(dados).filter(value => value !== 'id_site' && value !== 'accessToken');
        let valores = chaves.map(chave => dados[chave]);
        
        // Adicionar 'id_usuario' e 'id_site' às chaves e valores
        chaves.push("id_usuario", "id_site");
        valores.push(id_usuario, id_site);
    
        // Verificar se as colunas já existem antes de tentar adicioná-las
        const verificarColunasExistentes = (tabela, colunas) => {
            return new Promise((resolve, reject) => {
                const query = `SHOW COLUMNS FROM ${tabela}`;
                db.query(query, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    const colunasExistentes = result.map(row => row.Field);
                    const colunasNaoExistentes = colunas.filter(coluna => !colunasExistentes.includes(coluna));
                    resolve(colunasNaoExistentes);
                });
            });
        };
    
        try {
            const novasColunas = await verificarColunasExistentes('dados_dos_sites', chaves);
    
            if (novasColunas.length > 0) {
                for (const chave of novasColunas) {
                    await new Promise((resolve, reject) => {
                        db.query(`ALTER TABLE dados_dos_sites ADD COLUMN ${chave} TEXT`, (err, result) => {
                            if (err) {
                                return reject(err);
                            }
                            console.log(`Nova coluna '${chave}' adicionada à tabela 'dados_dos_sites'`);
                            resolve();
                        });
                    });
                }
            }
    
            // Montar a string de placeholders para o INSERT
            const placeholders = chaves.map(() => '?').join(',');
    
            // Montar a query de inserção
            const insertQuery = `INSERT INTO dados_dos_sites (${chaves.join(',')}) VALUES (${placeholders})`;
    
            db.query(insertQuery, valores, (err, result) => {
                if (err) {
                    console.log("Erro:", err.message);
                    return res.status(500).json({ mensagem: "Erro interno no servidor" });
                }
                return res.status(200).json({ mensagem: "Dados recebidos com sucesso" });
            });
        } catch (err) {
            console.log("Erro:", err.message);
            return res.status(500).json({ mensagem: "Erro interno no servidor" });
        }
    }  
    ,
    // Obtém todas as notificações de um médico ou usuário com base no accessToken fornecido
    obter_dados_de_navegacao_de_um_site: async (req, res) => {
        const { accessToken, id_site } = req.body;
        const id_usuario = token.usuarioId(accessToken);
    
        if (!id_usuario || !accessToken || !id_site) {
            return res.status(400).json({ Mensagem: "Verifique os campos e tente novamente" });
        }
    
        const selectQuery2 = "SELECT * FROM dados_dos_sites WHERE id_usuario = ? AND id_site = ?";
        db.query(selectQuery2, [id_usuario, id_site], (err, result) => {
            if (err) {
                console.log("Erro:" + err.message);
                return res.status(500).json({ Mensagem: "Erro interno do servidor" });
            }
            return res.status(200).json({ dados_de_navegacao: result });
        });
    },
    apagar_dados_de_navegacao_de_um_site: async (req, res) => {
        const { accessToken, id_site } = req.body;
        const id_usuario = token.usuarioId(accessToken);
    
        if (!id_usuario || !accessToken || !id_site) {
            return res.status(400).json({ Mensagem: "Verifique os campos e tente novamente" });
        }
    
        const deleteQuery = "DELETE FROM dados_dos_sites WHERE id_usuario = ? AND id_site = ?";
        db.query(deleteQuery, [id_usuario, id_site], (err, result) => {
            if (err) {
                console.log("Erro:" + err.message);
                return res.status(500).json({ Mensagem: "Erro interno do servidor" });
            }
            console.log(result.affectedRows)
            if(result.affectedRows===0){
                return res.status(404).json({ mensagem: "Dados de navegação não encontrados" });
            }
            return res.status(200).json({ mensagem: "Dados de navegação apagados com sucesso" });
        });
    }
};

module.exports = dados_de_navegacaoController;
