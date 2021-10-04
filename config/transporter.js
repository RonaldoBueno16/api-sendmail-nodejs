const nodemailer = require("nodemailer");
const {google} = require("googleapis");

require ('dotenv').config();

module.exports = async () => {
    try {
        const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
        oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

        const acessToken = await oAuth2Client.getAccessToken();
        
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                acessToken: acessToken
            }
        })

        transport.verify((error, sucess) => {
            if(error) {
                console.log("Falha ao conectar com o email: "+process.env.EMAIL);
                console.log(error);
            }
            else {
                console.log("Conectado ao email: "+process.env.EMAIL);
            }
        })
        return transport;
    }
    catch (error) {
        console.log("|| Falha de autenticação com a API do google");
        console.log("|| Falha de autenticação com a API do google");
        console.log("|| Falha de autenticação com a API do google");
        console.log("|| Falha de autenticação com a API do google");
        console.log("|| Falha de autenticação com a API do google");
        console.error(error);
    }
    return null;
}