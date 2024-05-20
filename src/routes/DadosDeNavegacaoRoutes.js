const express = require('express');
const router = express.Router();
const dados_de_navegacaoController = require('../controllers/DadosDeNavegacaoControllers');

// Rota para obter todas as notificações do sistema apenas para o ADM
router.post('/listar', dados_de_navegacaoController.obter_dados_de_navegacao_de_um_site);
router.post('/adicionar',dados_de_navegacaoController.addDados)
router.delete('/',dados_de_navegacaoController.apagar_dados_de_navegacao_de_um_site)

module.exports = router;
