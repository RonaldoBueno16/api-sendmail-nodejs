const model = require("../models/models");

module.exports = app => {

    app.get('/', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({status: "OK"})
    });

    app.post('/send', async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        
        var ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).replace('::ffff:', '');
        const conexao = require("../infraestrutura/connect");
        let myQuery = `SELECT server_name, token_auth FROM samptokens WHERE server_ip='${ip}' LIMIT 1`;
        
        conexao.query(myQuery, (erro, rows) => {
            if(erro) {
                res.status(400).json({status: 'failed', response: 'Falha ao consultar o banco de dados'});
            }
            else {
                if(rows.length) {
                    if(req.body.to != undefined) {
                        console.log(Object.getOwnPropertyDescriptors(rows[0]).server_name.value);
                        req.body.to = `${Object.getOwnPropertyDescriptors(rows[0]).server_name.value} <${req.body.to}>`;
                    }

                    if(Object.getOwnPropertyDescriptors(rows[0]).token_auth.value == null) {
                        res.status(400).json({status: 'failed', response: 'Nao foi encontrado nenhum email autenticado no seu usuario.'});
                    }
                    else {
                        myQuery = `SELECT * FROM accountsgoogle WHERE token_index=${Object.getOwnPropertyDescriptors(rows[0]).token_auth.value}`;
                        conexao.query(myQuery, async (erro, rows) => {
                            if(erro) {
                                res.status(400).json({status: 'failed', response: 'Nao foi encontrado nenhum email autenticado no seu usuario.'});
                            }
                            else {
                                const EMAIL_NAME = Object.getOwnPropertyDescriptors(rows[0]).EMAIL_NAME.value;
                                const EMAIL = Object.getOwnPropertyDescriptors(rows[0]).EMAIL.value;
                                const CLIENT_ID = Object.getOwnPropertyDescriptors(rows[0]).CLIENT_ID.value;
                                const CLIENT_SECRET = Object.getOwnPropertyDescriptors(rows[0]).CLIENT_SECRET.value;
                                const REDIRECT_URI = Object.getOwnPropertyDescriptors(rows[0]).REDIRECT_URI.value;
                                const REFRESH_TOKEN = Object.getOwnPropertyDescriptors(rows[0]).REFRESH_TOKEN.value;
                                
                                const transporterEx = require("../config/transporter");
                                const transporter = await transporterEx(EMAIL,CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN);
                
                                if(transporter == null) {
                                    res.status(500).json({status: 'failed', response: 'Falha de autenticação com a API do Google.'})
                                }
                                else {
                                    model.sendMaail(req.body, transporter, res);
                                }
                                
                            }
                        });
                    }
                }
                else {
                    res.status(400).json({status: 'failed', response: 'O seu servidor não está autenticado para utilizar nossa API'});
                }
            }
        })
    })
}