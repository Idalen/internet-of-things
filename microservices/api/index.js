const express = require("express")
const cors = require('cors')
var temperatureRouter = require("./routes/temperatureRouter.js");
var humidityRouter = require("./routes/humidityRouter.js");

const app = express();

app.use(express.json());
app.use(cors())

let PORT = 6123;

const server = app.listen(PORT, () => {
    if (server) {
       const address = server.address();
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});

app.use('/temperature', temperatureRouter);
app.use('/humidity', humidityRouter);


