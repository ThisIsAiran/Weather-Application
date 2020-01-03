const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address+'.json?access_token=pk.eyJ1IjoiZ3VwdGFhbWFuNzA2NTkiLCJhIjoiY2pzeXl3bXZ5MGd3bzN5cGhybGJhMDRodyJ9.BS5cRzAaTwMWWG58C-nFbw'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features[0]=== undefined) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode