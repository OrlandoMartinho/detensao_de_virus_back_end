const secretKey = require('../private/secretKey.json');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');

const token = {
    usuarioId: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey)
            if (decodedToken) {
                return decodedToken.id_usuario;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    },
    usuarioNome: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey)
            if (decodedToken) {
                return decodedToken.nome;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    },
    usuarioProtecao: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey)
            if (decodedToken) {
                return decodedToken.protecao;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    },
    verificarTokenUsuario: (accessToken) => {
        return new Promise((resolve, reject) => {
            const id_usuario = token.usuarioId(accessToken);

            const query = 'SELECT token FROM usuarios WHERE id_usuario = ?';
            db.query(query, [id_usuario], (err, result) => {
                if (err) {
                    console.error('Erro ao buscar token do usuário:', err);
                    reject(err);
                } else {
                    if (result.length === 0) {
                        resolve(false);
                    } else {
                        const userToken = result[0].token;
                        resolve(userToken === accessToken);
                    }
                }
            });
        });
    }, 
};

module.exports = token;
