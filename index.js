const customExpress = require("./config/customExpress");
const cors = require("cors");
const conexao = require("./infraestrutura/connect");

const port = process.env.PORT || 8080;



conexao.getConnection((error, connection) => {
    if(error) {
        console.log("NÃO CONECTOU");
    }
    else {
        console.log("CONECTOU");
    }
})

const app = customExpress();
app.use(cors());
app.listen(port, () => {
    
});