const express = require('express');
const router = express.Router();
const sitesController = require('../controllers/SitesController');

// Rota para cadastrar um novo contato
router.post('/cadastrar', sitesController.cadastrarsites);

// Rota para listar todos os contatos de um usuário
router.post('/listar', sitesController.listarsites);

// Rota para obter um contato por ID
router.post('/obter_por_id', sitesController.obtersitesPorId);

// Rota para eliminar um contato por ID
router.delete('/', sitesController.eliminarsitesPeloId);


module.exports = router;
