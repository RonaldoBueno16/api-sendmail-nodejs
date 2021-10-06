const { Validator } = require('jsonschema');

const v = new Validator();

class mail {
    async sendMaail(nomeRemetente, addresEmail, data, transporter, res) {

        try {
            const teste = Object.getOwnPropertyNames(data);
            if(teste.length == 1) { //Converter em JSON (SAMP)
                data = JSON.parse(teste[0]);
            }
    
            const schema = {
                type: "object",
                properties: {
                from: {"type": "string"},
                to: {"type": "string"},
                subject: {"type": "string"},
                text: {"type": "string"},
                html: {"type": "string"},
                },
                required: ['to', 'subject']
            };
            
            if(v.validate(data, schema).valid) {
                
                const mailOptions = {
                from: `${nomeRemetente} <${addresEmail}>`,
                to: data.to,
                subject: data.subject,
                text: data.text,
                html: data.html
                }
    
                const result = await transporter.sendMail(mailOptions);
    
                res.status(200).json({
                    status: 'sucess',
                    response: 'Email enviado com sucesso',
                    data: result
                });
            }
            else {
                res.status(400).json({"status": "failed", "response": "JSON inválido", "json_example:": {
                    to: "Destinatario",
                    subject: "Assunto",
                    text: "Corpo",
                    html: "HTML (opcional)"
                }});
            }
        }
        catch(error) {
            console.log(error);
            res.status(400).json(error);
        }
        
    }
}
module.exports = new mail;