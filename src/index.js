const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = require('./private/Port.json'); 
const dataBase=require('./config/CreateDataBase')
const app = express();

app.use(bodyParser.json());
app.use(cors());



// Importar as rotas

const usersRoutes = require('./routes/UserRoutes');
const dadosDeNavegacaoRoutes = require('./routes/DadosDeNavegacaoRoutes');
const sitesRoutes=require('./routes/SitesRoutes')
  

// Adicionar rotas
app.use('/usuarios', usersRoutes);
app.use('/dados_de_navecacao', dadosDeNavegacaoRoutes)
app.use('/sites',sitesRoutes)

// Iniciar o servidor
const PORT = process.env.PORT||port.PORT;
const HOST = process.env.HOST||port.HOST

// Inicializando o servidor
app.listen(PORT,HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}/`);

});
