const express = require("express"); 
const HumidityController  = require("../controller/humidityController.js");

// const temperatureController = new TemperatureController(
//     new TemperatureBusiness(
//         new TemperatureDatabase() 
//     )
// );

const humidityController = new HumidityController;

const humidityRouter = express.Router();

humidityRouter.get("/", humidityController.getHumidity);

module.exports = humidityRouter;