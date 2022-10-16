const TemperatureData =  require("../database/temperatureData.js")

class TemperatureController{

    getTemperature = async (req, res) => {
        try{
            const window = req.query['window'];
            const temperatureData = new TemperatureData();
            const result = await temperatureData.get(window);
            res.status(201).send(`Everything is fine. ${result}`);
        }
        catch(err){
            res.status(400).send({message:err.message});
            console.log(err);
        }
    } 
}

module.exports = TemperatureController;
