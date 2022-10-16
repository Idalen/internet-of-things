const {InfluxDB, flux} = require('@influxdata/influxdb-client')

class Database{
    
    url = "http://localhost:8086";
    token = "1LWy6GO7ZRQy0CnzzNZTA_KUhgznI4b78xWPvFyAm17H9tYEImJ8mXYqZmvVVCWG9fXwTUDABPvmIS68kBrr8g=="
    org = "users"
    bucket = "data"

    connect = () => {
        this.client = new InfluxDB({url: this.url, token: this.token}); 
        this.queryApi = this.client.getQueryApi(this.org)   
    }

    exec = (query) => {
        this.queryApi.queryRows(query, {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`)
            },
            error(error) {
                console.log(error)
                console.log('Finished ERROR')
            },
            complete() {
                console.log('Finished SUCCESS')
            },
        })
    }
};

module.exports = Database;