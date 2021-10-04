const nodemailer = require("nodemailer");

require ('dotenv').config();

module.exports = () => {
    console.log("Estabelecendo conexão com o email");
    const transporter = nodemailer.createTransport(JSON.parse(process.env.configTransporter))
    transporter.verify((error, sucess) => {
        if(error) {
            console.log("Falha ao conectar com o email: "+JSON.parse(process.env.configTransporter).auth.user);
            console.log(error);
        }
        else {
            console.log("Conectado ao email: "+JSON.parse(process.env.configTransporter).auth.user);
        }
    })
    return transporter;
}