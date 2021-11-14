const request = require('request')

const geocode = (address, callback) => {

    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3JpZGVlcCIsImEiOiJja3ZtY2QxNXMweTM5MnhvdXNvbTRkbnh0In0.sniXs_m3rtVuSZVC1NS3gQ'
    request({ url: url, json: true}, (error, data)=> {
        if(error){
            callback('Unable to access the location services!', undefined)
        }
        else if(data.body.features.length === 0){
            callback('Search failed. Try other search!',undefined)
        }
        else {
            callback(undefined,{
                Latitude: data.body.features[0].center[1],
                Longitude: data.body.features[0].center[0]
            })
        }
    })

}

module.exports = geocode