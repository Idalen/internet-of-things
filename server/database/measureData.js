const {InfluxDB, flux} = require('@influxdata/influxdb-client');
const Database = require("./base.js");

class MeasureData{
    get = async (name, window, measurement) => {
        try {

            const db = new Database
            db.connect()
            
            const query = flux`from(bucket: ${db.bucket})
            |> range(start: -${parseInt(window)}d)
            |> filter(fn: (r) => r["_measurement"] == ${name})
            |> filter(fn: (r) => r["_field"] == ${measurement})
            |> aggregateWindow(every: 15m, fn: mean, createEmpty: false)`
            
            let result = db.exec(query)

            return result

        } catch (err) {
            console.log(err.message)
            throw new Error(err.message) //MySQL.message
        }
    }
};

module.exports = MeasureData