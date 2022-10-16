const express = require("express")
var temperatureRouter = require("./routes/temperatureRouter.js");

const app = express();

app.use(express.json());

let PORT = 6123;

const server = app.listen(PORT, () => {
    if (server) {
       const address = server.address();
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});

app.use('/temperature', temperatureRouter);
