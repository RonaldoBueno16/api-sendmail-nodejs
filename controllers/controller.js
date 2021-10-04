const model = require("../models/models");
const nodemailer = require("nodemailer");

module.exports = app => {
    app.get('/', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({status: "OK"})
    });

    app.post('/send', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: { user: "email", pass: "pass" }
        })

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