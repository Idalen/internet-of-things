

const prepareData = (raw_data) => {
    
    let prepared_data = {"timestamp":[], "measurement":[]}
    
    for(let i in raw_data){
        prepared_data["timestamp"].push(raw_data[i]['_time'])
        prepared_data["measurement"].push(raw_data[i]['_value'])
    }

    return prepared_data
}

module.exports = prepareData