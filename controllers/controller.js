const model = require("../models/models");

module.exports = app => {

    app.get('/', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({status: "OK"})
    });

    app.post('/send', async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        
        var ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).replace('::ffff:', '');
        
        const transporterEx = require("../config/transporter");
        const transporter = await transporterEx();

        const conexao = require("../infraestrutura/connect");
        const myQuery = `SELECT server_name FROM samptokens WHERE server_ip='${ip}' LIMIT 1`
        conexao.query(myQuery, (erro, rows) => {
            if(erro) {
                res.status(400).json({status: 'failed', response: 'Falha ao consultar o banco de dados'});
            }
            else {
                if(rows.length) {
                    if(req.body.to != undefined) {
                        req.body.to = `${Object.getOwnPropertyDescriptors(rows[0]).server_name.value} <${req.body.to}>`;
                    }
    
                    if(transporter == null) {
                        res.status(500).json({status: 'failed', response: 'Falha de autenticação com a API do Google.'})
                    }
                    else {
                        model.sendMaail(req.body, transporter, res);
                    }
                }
                else {
                    res.status(400).json({status: 'failed', response: 'O seu servidor não está autenticado para utilizar nossa API'});
                }
            }
        })
    })
}