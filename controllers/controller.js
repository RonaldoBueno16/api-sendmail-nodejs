const model = require("../models/models");
const nodemailer = require("nodemailer");
require ('dotenv').config();

module.exports = app => {
    app.get('/', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({status: "OK"})
    });

    app.post('/send', async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");

        let testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport(JSON.parse(process.env.configTransporter))

        transporter.verify((error, sucess) => {
            if(error) {
                console.log(error);
            }
            else {
                const dados = req.body;
                
                model.sendMail(dados, transporter, res);
            }
        })
    })
}