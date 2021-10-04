const { Validator } = require('jsonschema');

const v = new Validator();

class mail {
    async sendMaail(data, transporter, res) {
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
              from: `${process.env.EMAIL_NAME} <${process.env.EMAIL}>`,
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
}
module.exports = new mail;