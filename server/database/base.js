const {InfluxDB, flux} = require('@influxdata/influxdb-client')

class Database{
    
    url = "http://database:8086"
    token = "m0G93Wj5Au6HuXsutfpJoNuhqOOQ9ZjyQ7fere-7ExvcQfwv39AOdXSJ3tbccphyuoZyBcPyHvucSMsGmGA91w=="
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