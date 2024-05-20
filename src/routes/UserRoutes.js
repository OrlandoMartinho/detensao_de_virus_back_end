const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UserController');

//Rota para eliminar Usuario
router.post('/', UsersController.cadastrarUsuario);
//Rotas para cadastrar Usuario
router.delete('/',UsersController.eliminarUsuario) 
//Rota para gerir a protecao
router.put('/',UsersController.gerirProtecao)

module.exports = router;
