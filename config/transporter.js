const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const conexao = require("../infraestrutura/connect");

require ('dotenv').config();

module.exports = async (EMAIL,CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN) => {
    try {
        const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
        oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

        const acessToken = await oAuth2Client.getAccessToken();
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                acessToken: acessToken
            }
        })

        transport.verify((error, sucess) => {
            if(error) {
                console.log("Falha ao conectar com o email: "+EMAIL);
                console.log(error);
            }
        })
        return transport;
    }
    catch (error) {
        console.log("|| Falha de autenticação com a API do google");
        console.error(error);
    }
    return null;
}