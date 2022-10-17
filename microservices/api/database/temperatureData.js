const {InfluxDB, flux} = require('@influxdata/influxdb-client');
const Database = require("./base.js");

class TemperatureData{

    get = async (window) => {
        try {
            const db = new Database
            db.connect()
            
            const query = flux`from(bucket: "${db.bucket}")
            |> range(start: 0)
            |> filter(fn: (r) => r["_measurement"] == "Caqueiro")
            |> filter(fn: (r) => r["_field"] == "temperature")`

            let result = db.exec(query)
            return result

        } catch (err) {
            console.log(err.message)
            throw new Error(err.message) //MySQL.message
        }

        
    }
};

module.exports = TemperatureData