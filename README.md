# Backend

 Este é o repositório do backend do aplicativo ######, uma extensão de navegador para proteção de dados.

## Configuração

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório para o seu ambiente local.
3. Execute `npm install` para instalar todas as dependências necessárias.
4. Ligue um servidor Apache & MySQL.


### Arquivos de Configuração

Os arquivos de configuração podem ser encontrados na pasta `private`.

#### Na pasta `private`

- `CredenciaisEmail.json`: Credenciais de e-mail para envio de códigos de verificação.
- `keyDb.json`: Chave do banco de dados.
- `Port.json`: Configuração da porta do servidor.
- `secretKey.json`: Chave secreta para geração de tokens JWT.
- Valores usados por `default` no banco de dados.

```json
{
  "host": "localhost",
  "user": "root",
  "password": "",
  "database": "detensao_bd"
}
```

- Valores usados por `default` na API.

```json
{
  "host_node": "http://localhost:3000",
}
```

#### Na pasta `docs`

Esta pasta contém a documentação do projeto, incluindo diagramas de classes e diagramas ER.

## Rotas de Usuário

### 1. Cadastrar Usuário

- **Rota**: `POST /usuarios/`
- **Descrição**: Permite que um usuário receba um código de verificação para autenticação.
- **Corpo da Requisição**: JSON contendo o email do usuário.
  ```json
  {
    "nome": "exemplo"
  }
  ```

### 2. Apagar Usuário

- **Rota**: `DELETE /usuarios/`
- **Descrição**: Permite apagar um usuário.
- **Corpo da Requisição**: JSON contendo o token do usuário.
  ```json
  {
    "accessToken": "mvdlmkv"
  }

### 3. Gerir proteção

- **Rota**: `PUT /usuarios/`
- **Descrição**: Permite hablitar ou desablitar usuário.
- **Corpo da Requisição**: JSON contendo o token do usuário.
  ```json
  {
    "accessToken": "mvdlmkv"
  }


## Rotas dos sites

### 1. Cadastrar um site
- **Rota**: `POST /sites/cadastrar`
- **Descrição**: Permite para cadastrar um site.
- **Corpo da Requisição**: JSON contendo o nome do usuario.
  ```json
  {
    "accessToken":"ddddddd",
    "url":"www.youtube.com"
    "nome": "youtube"
  }
 
### 2. Rota para cadastrar um site

- **Rota**: `POST /sites/`
- **Descrição**: Permite listar todos os  site.
- **Corpo da Requisição**: JSON contendo o nome do usuario.
  ```json
  {
    "accessToken":"ddddddd"
  }

### 3. Rota para obter um site

- **Rota**: `POST /sites/obter_por_id`
- **Descrição**: Permite obter dados de um site.
- **Corpo da Requisição**: JSON contendo o id_site eo token do usuario.
  ```json
  {
    "accessToken":"ddddddd",
    "id_site":"1"
  }
### 4. Rota para eliminar um site

- **Rota**: `DELETE /sites/`
- **Descrição**: Permite eliminar um site.
- **Corpo da Requisição**: JSON contendo o nome do usuario.
  ```json
  {
    "accessToken":"ddddddd",
    "id_site":"1"
  }
  
## Rotas dos dados de navegação

### 1. Cadastrar dados de navegação

- **Rota**: `POST /dados_de_navecacao/adicionar`
- **Descrição**: Permite que cadastra dados de navegação de um site.
- **Corpo da Requisição**: JSON contendo o token ,o id_site e os demais dados deste site.
  ```json
  {
    "id_site": "exemplo",
    "accessToken":"kgkklklf",
    "exemplo1":"exemplo1"
    "exemplo2":"exemplo2"
  }
  ```

### 2. Apagar Usuário

- **Rota**: `DELETE /dados_de_navegacao/`
- **Descrição**: Permite apagar um usuário.
- **Corpo da Requisição**: JSON contendo o token do usuárioe o id_site.
  ```json
  {
    "accessToken": "mvdlmkv",
    "id_site":""
  }

### 3. listar dados de navegação

- **Rota**: `POST /dados_de_navegacao/listar`
- **Descrição**: Permite listar os dados de navegação de um site.
- **Corpo da Requisição**: JSON contendo o token do usuário.
  ```json
  {
    "accessToken": "mvdlmkv",
    "id_site":"0"
  }

