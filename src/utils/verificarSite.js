const axios = require('axios');
const apikey=require('../private/secretKey.json')

async function verificaURLVirusTotal(url) {
    const urlVirusTotal = 'https://www.virustotal.com/vtapi/v2/url/report';
    const params = {
        apikey: apikey.apiVirusTotal,
        resource: url
    };

    try {
        const response = await axios.get(urlVirusTotal, { params });
        const result = response.data;

        if (result.response_code === 1) {
            const numberOfAnalyses = result.total;
            console.log(`A URL foi analisada por ${numberOfAnalises} mecanismos de verificação de malware.`);
            
            if (result.positives > 0) {
                return false; // URL é considerada insegura
            } else {
                return true; // URL é considerada segura
            }
        } else {
            console.log("A URL não pôde ser analisada pelo VirusTotal.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao acessar o VirusTotal:", error);
        return false;
    } 
}

module.exports = verificaURLVirusTotal;
