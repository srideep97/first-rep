const request = require('request')

const forecast = (long, lat, callback) => {

    const geourl = 'http://api.weatherstack.com/current?access_key=e55382dd3127d5587b22565d3ce6827d&query=' + lat + ',' + long + '&units=f'
    request({ url: geourl, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(response.body.error){
            callback('Try another search',undefined)
        }
        else {
            callback(undefined, 'The temparature is '+ response.body.current.temperature)
        }

    })
}

module.exports = forecast