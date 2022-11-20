const TemperatureData =  require("../database/temperatureData.js")
const prepareData = require("../utils/prepareData.js")

class TemperatureController{

    getTemperature = async (req, res) => {
        try{
            const {name, window, measurement} = req.body;
            const temperatureData = new TemperatureData();
            const raw_data = await temperatureData.get(name, window, measurement);
            const result = prepareData(raw_data)
            res.status(201).send(result);
        }
        catch(err){
            res.status(400).send({message:err.message});
            console.log(err);
        }
    } 
}

module.exports = TemperatureController;
