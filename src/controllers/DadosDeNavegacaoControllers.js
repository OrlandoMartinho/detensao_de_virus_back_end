const db = require('../config/dbConfig');
const token = require('../utils/token');

const dados_de_navegacaoController = {
    // Adiciona uma notificação para um médico ou usuário com base no accessToken fornecido
    addDados:async (req,res) => {
        const { accessToken, id_site } = req.body;
        const id_usuario = token.usuarioId(accessToken);
        
        if (!id_usuario || !accessToken) {
            return res.status(400).json({ mensagem: "Verifique os campos e tente novamente" });
        }
    
        const dados = req.body;
        const chaves = Object.keys(dados);
        const valores = Object.values(dados);
    
        // Remover 'id_site' e 'accessToken' das chaves
        const chavesFiltradas = chaves.filter(value => value !== 'id_site' && value !== 'accessToken');
    
        // Adicionar as novas colunas ao banco de dados
        chavesFiltradas.forEach(chave => {
            db.query(`ALTER TABLE dados_dos_sites ADD COLUMN ${chave} TEXT`, (err, result) => {
                if (err) {
                    console.log("Erro:", err.message);
                    return res.status(500).json({ mensagem: "Erro interno do servidor" });
                }
                console.log(`Nova coluna '${chave}' adicionada à tabela 'funcionarios'`);
            });
        });
    
        // Montar a string de placeholders para o INSERT
        const placeholders = chavesFiltradas.map(() => '?').join(',');
    
        // Montar a query de inserção
        const insertQuery = `INSERT INTO dados_dos_sites (${chavesFiltradas.join(',')}) VALUES (${placeholders})`;
    
        // Adicionar o id_usuario ao array de valores
        valores.push(id_usuario);
        valores.push(id_site)
    
        db.query(insertQuery, valores, (err, result) => {
            if (err) {
                console.log("Erro:", err.message);
                return res.status(500).json({ mensagem: "Erro interno no servidor" });
            }
            return res.status(200).json({ mensagem: "Dados recebidos com sucesso" });
        });
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
            return res.status(200).json({ mensagem: "Dados de navegação apagados com sucesso" });
        });
    }
    
};

module.exports = dados_de_navegacaoController;
