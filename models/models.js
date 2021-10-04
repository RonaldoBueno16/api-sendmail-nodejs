const { Validator } = require('jsonschema');

const v = new Validator();

class mail {
    async sendMail(data, transporter, res) {
          const schema = {
            type: "object",
            properties: {
              from: {"type": "string"},
              to: {"type": "string"},
              subject: {"type": "string"},
              text: {"type": "string"},
              html: {"type": "string"},
            },
            required: ['to', 'subject', 'text']
          };
           
          if(v.validate(data, schema).valid) {
            let info = await transporter.sendMail({
                to: data.to,
                subject: data.subject,
                text: data.text,
                html: data.html,
              });

              if(info.accepted.length) {
                res.status(200).json({"status": "sucess", "msg": "Email enviado com sucesso!", "emails": info.accepted})
              }
          }
          else {
              res.status(400).json({"status": "failed", "msg": "JSON inválido", "json_example:": {
                  from: "Remetente",
                  to: "Destinatario",
                  subject: "Assunto",
                  text: "Corpo",
                  html: "HTML (opcional)"
              }});
          }
    }
}
module.exports = new mail;