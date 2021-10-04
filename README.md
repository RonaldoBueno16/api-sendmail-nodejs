# Enviar email utilizando serviços do google

## Autenticação

A autenticação foi feita utilizando o protocolo OAuth2.

**Passo a passo de como fazer a autenticação:** https://imgur.com/a/DyhF88F

## Credenciais

Como foi utilizado o protocolo OAuth2 para fazer a autenticação, não se faz necessário o uso da senha do email, mas sim as tokens geradas para autenticar.
No repositório tem um arquivo chamado `.env_example`, ele deverá ser renomeado para .env contendo a estrutura abaixo:

```
EMAIL_NAME=Email
EMAIL=Email
CLIENT_ID=clientId
CLIENT_SECRET=secretId
REDIRECT_URI=https://developers.google.com/oauthplayground
REFRESH_TOKEN=token
```

## Testando a API

Atualmente ela está hospedada na Heroku e está disponível para testes no seguinte URL: https://enviodeemail.herokuapp.com/send.
Ela espera receber um objeto JSON com a estrutura:

```
{
    "to": "DESTINATARIO", 
    "subject": "Assunto",
    "text": "Texto",
    "html": "<b>Texto</b>"
}
```
