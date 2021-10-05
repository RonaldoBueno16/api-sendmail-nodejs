const model = require("../models/models");


module.exports = app => {

    app.get('/', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({status: "OK"})
    });

    app.post('/send', async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        
        const transporterEx = require("../config/transporter");
        const transporter = await transporterEx();

        if(transporter == null) {
            res.status(500).json({status: 'failed', response: 'Falha de autenticação com a API do Google.'})
        }
        else {
            model.sendMaail(req.body, transporter, res);
        }
    })
}