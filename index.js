const customExpress = require("./config/customExpress");
const cors = require("cors");
const conexao = require("./infraestrutura/connect");

const port = process.env.PORT || 8080;

conexao.getConnection((error, connection) => {
    if(error) {
        console.log("A api não conseguiu o conectar-se com o DB");
    }
    else {
        const app = customExpress();
        app.use(cors());
        app.listen(port, () => {
            console.log("CONEXÂO ESTABELECIDA");
        });
    }
})