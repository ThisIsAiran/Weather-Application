const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bd396944948acb34a21336c42707f5e4/' + latitude + ',' + longitude
    console.log(url);
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const Temp = parseInt(body.currently.temperature, 10)-32
            console.log(Temp)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + Temp + ' Degree Celsius. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast