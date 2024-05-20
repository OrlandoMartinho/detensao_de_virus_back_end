const express = require('express');
const router = express.Router();
const notificacoesController = require('../controllers/DadosDeNavegacaoControllers');

// Rota para obter todas as notificações do sistema apenas para o ADM
router.post('/listar', notificacoesController.obterTodasNotificacoes);
router.post('/adicionar',notificacoesController.addNotificacao)

module.exports = router;
