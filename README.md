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