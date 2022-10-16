const express = require("express"); 
const TemperatureController  = require("../controller/temperatureController.js");

// const temperatureController = new TemperatureController(
//     new TemperatureBusiness(
//         new TemperatureDatabase() 
//     )
// );

const temperatureController = new TemperatureController;

const temperatureRouter = express.Router();

temperatureRouter.get("/", temperatureController.getTemperature);

module.exports = temperatureRouter;