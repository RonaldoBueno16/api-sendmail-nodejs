const nodemailer = require("nodemailer");

require ('dotenv').config();

module.exports = () => {
    const transporter = nodemailer.createTransport(JSON.parse(process.env.configTransporter))
    transporter.verify((error, sucess) => {
        if(error) {
            console.log(error);
        }
        else {
            console.log("Conectado ao email: "+JSON.parse(process.env.configTransporter).auth.user);
        }
    })
    return transporter;
}