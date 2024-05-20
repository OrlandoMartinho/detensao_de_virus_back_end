const mysql = require('mysql2');
const keysBd = require('../private/keyDb.json');
// Chaves de conexão com o banco de dados
const dbConfig = {
  host: keysBd.host,
  user: keysBd.user,
  password: keysBd.password,
  database: keysBd.database
};

// Função para verificar se o banco de dados existe
function checkIfDatabaseExists(connection, databaseName) {
  return new Promise((resolve, reject) => {
    connection.query(`SHOW DATABASES LIKE '${databaseName}'`, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.length > 0);
    });
  });
}

// Função para criar o banco de dados
function createDatabase(connection, databaseName) {
  return new Promise((resolve, reject) => {
    connection.query(`CREATE DATABASE ${databaseName}`, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// Função para verificar se a tabela existe
function checkIfTableExists(connection, tableName) {
  return new Promise((resolve, reject) => {
    connection.query(`SHOW TABLES LIKE '${tableName}'`, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.length > 0);
    });
  });
}

// Função para executar uma consulta SQL
function runQuery(connection, query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err); 
        return;
      }
      resolve();
    });
  });
}

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password
});

// Conectar ao banco de dados
connection.connect(async (err) => {
  if (err) {
  
  }

  console.log('Criação Do Banco De Dados Feito com Sucesso.');

  try {
    // Verificar se o banco de dados existe e criar se não existir
    const databaseExists = await checkIfDatabaseExists(connection, dbConfig.database);
    if (!databaseExists) {
      await createDatabase(connection, dbConfig.database);
      console.log(`Banco de dados ${dbConfig.database} criado com sucesso.`);
    } else {
      console.log(`O banco de dados ${dbConfig.database} já existe.`);
    }

    // Conectar ao banco de dados específico
    connection.changeUser({ database: dbConfig.database });
    
    // Definir as consultas CREATE TABLE para cada tabela
    const createTableQueries = [
      `CREATE TABLE IF NOT EXISTS usuarios(id_usuario int not null auto_increment primary key,
        nome varchar(45) default null,
        protecao INT DEFAULT 0,
        token TEXT DEFAULT null
      )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,
  
      `CREATE TABLE IF NOT EXISTS dados_dos_sites(id_dado_do_site int not null auto_increment primary key,
        id_site int DEFAULT NULL
      )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,
  
      `CREATE TABLE IF NOT EXISTS sites(id_site int not null auto_increment primary key,
        nome varchar(255) DEFAULT NULL,
        url TEXT DEFAULT NULL,
        id_usuario INT DEFAULT NULL,
        verificado INT DEFAULT 0,
        data_de_verificacao DATETIME DEFAULT current_timestamp,
        data_da_navegacao DATETIME DEFAULT current_timestamp,
        seguro INT DEFAULT NULL
       )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`
  ];
  
  

   
   
  const connection3 = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password
  });
  connection3.changeUser({ database: dbConfig.database });
    // Verificar se cada tabela existe e criar somente as que não existem
    for (const query of createTableQueries) {
      const tableName = query.match(/CREATE TABLE IF NOT EXISTS (\S+)/)[1];
      const tableExists = await checkIfTableExists(connection3, tableName);
      if (!tableExists) {
        await runQuery(connection, query);
        
      } else {
       
      }
    }
    const connection2 = mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    connection2.changeUser({ database: dbConfig.database });
    console.log('Processo de criação de tabelas concluído.');
  } catch (error) { 
  console.log(error)
  } finally {
    // Fechar a conexão com o servidor MySQL
    connection.end();
  }
});

module.exports=connection
