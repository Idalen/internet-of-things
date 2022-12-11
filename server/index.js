const express = require("express")
const cors = require('cors')
var measureRouter = require("./routes/measureRouter.js");

const app = express();

app.use(express.json());
app.use(cors())

let PORT = 3333;

const server = app.listen(PORT, () => {
    if (server) {
       const address = server.address();
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});

app.use('/measure', measureRouter);


