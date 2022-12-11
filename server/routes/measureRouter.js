const express = require("express"); 
const MeasureController  = require("../controller/measureController.js");

const measureController = new MeasureController;

const measureRouter = express.Router();

measureRouter.get("/", measureController.getMeasure);

module.exports = measureRouter;