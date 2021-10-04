const model = require("../models/models");

const transporterEx = require("../config/transporter");
const transporter = transporterEx();

module.exports = app => {

    app.get('/', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({status: "OK"})
    });

    app.post('/send', async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        
        model.sendMail(req.body, transporter, res);
    })
}

