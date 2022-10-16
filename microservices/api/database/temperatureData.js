const {InfluxDB, flux} = require('@influxdata/influxdb-client');
const Database = require("./base.js");

class TemperatureData{

    get = async (window) => {
        try {
            const db = new Database;
            await db.connect();
            
            const query = flux`from(bucket: "${db.bucket}")
            |> range(start: 0)`

            db.exec(query)

        } catch (err) {
            throw new Error(err.message); //MySQL.message
        }
    }
};

module.exports = TemperatureData;