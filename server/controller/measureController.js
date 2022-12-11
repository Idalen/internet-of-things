const MeasureData =  require("../database/measureData.js")
const prepareData = require("../utils/prepareData.js")

class MeasureController{

    getMeasure = async (req, res) => {
        try{
            const {name, window, measurement} = req.query;
            console.log(req.query)
            const measureData = new MeasureData();
            const raw_data = await measureData.get(name, window, measurement);
            const result = prepareData(raw_data)
            res.status(201).send(result);
        }
        catch(err){
            res.status(400).send({message:err.message});
            console.log(err);
        }
    } 
}

module.exports = MeasureController;
