const {InfluxDB, flux} = require('@influxdata/influxdb-client');
const Database = require("./base.js");

class HumidityData{

    get = async (window) => {
        try {
            const db = new Database
            db.connect()
            
            const query = flux`from(bucket: "${db.bucket}")
            |> range(start: -7d)
            |> filter(fn: (r) => r["_measurement"] == "smelling_pepper")
            |> filter(fn: (r) => r["_field"] == "humidity")`

            let result = db.exec(query)
            return result

        } catch (err) {
            console.log(err.message)
            throw new Error(err.message) //INFLUX.message
        }
    }
};

module.exports = HumidityData