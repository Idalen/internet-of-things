const HumidityData =  require("../database/humidityData.js");
const prepareData = require("../utils/prepareData.js");

class HumidityController{

    getHumidity = async (req, res) => {
        try{
            const window = req.query['window'];
            const humidityData = new HumidityData();
            const raw_data = await humidityData.get(window);
            const result = prepareData(raw_data)
            res.status(201).send(result);
        }
        catch(err){
            res.status(400).send({message:err.message});
            console.log(err);
        }
    } 
}

module.exports = HumidityController;
