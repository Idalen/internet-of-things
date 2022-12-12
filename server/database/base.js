const {InfluxDB, flux} = require('@influxdata/influxdb-client')

class Database{
    
    url = "http://database:8086"
    token = "1LWy6GO7ZRQy0CnzzNZTA_KUhgznI4b78xWPvFyAm17H9tYEImJ8mXYqZmvVVCWG9fXwTUDABPvmIS68kBrr8g=="
    org = "users"
    bucket = "data"

    connect = () => {
        this.client = new InfluxDB({url: this.url, token: this.token}) 
        this.queryApi = this.client.getQueryApi(this.org)   
    }

    exec = async (query) => {
        const data = await this.queryApi.collectRows(query)
        return data
    }
}

module.exports = Database