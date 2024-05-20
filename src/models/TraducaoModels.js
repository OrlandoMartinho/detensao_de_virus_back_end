const idiomas = require('../private/idiomas.json');
const traduzir2 = require('../utils/traducao');
const token = require('../utils/token');

const modelTraducao = {
    traduzir: async (req, res) => {


        const { frase, codigoLinguagem,accessToken } = req.body;
        if (!frase || !codigoLinguagem||!accessToken) {
            return res.status(400).json({ message: "Frase e código de idioma são necessários" });
        }

        if(!await token.verificarTokenUsuario(accessToken)){
            return res.status(401).json({Mensagem:"Token inválido"})
        }

       const traducao =  await traduzir2(frase, codigoLinguagem);

       if(traducao==null){
        return res.status(400).json({ "Erro":"Verifique a internet e o codigo de idioma e tente novamente" });
       }else{
        return res.status(200).json({ traducao:traducao });
       }
     
    },
    listarIdiomas: async (req, res) => {
        return   res.status(200).json(idiomas);
    }

}

module.exports =modelTraducao