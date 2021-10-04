const customExpress = require("./config/customExpress");
const cors = require("cors");

const port = process.env.PORT || 8080;

const app = customExpress();
app.use(cors());
app.listen(port, () => {
    
});