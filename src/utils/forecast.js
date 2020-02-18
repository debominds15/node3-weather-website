const request = require('request')
const forecast = (latitude, longitude, callback) => {
    var url = 'https://api.darksky.net/forecast/91a68dc233980b055fd024db6915a0c3/'
    + longitude + ',' + latitude
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }
        else if(body.error){
            callback('Unable to find the location. PLease try later!', undefined)
        }
        else{
            /*callback(undefined, {
                temperature: body.currently.temperature,
                precipitationProbablity: body.currently.precipProbability
            })*/
            console.log(body.daily.data[0]);
            
            callback(undefined, body.daily.data[0].summary + 'The highest and lowest temperatures are ' 
            + body.daily.data[0].temperatureHigh + ' and ' + body.daily.data[0].temperatureLow 
            + ' degrees respectivley. It is currently ' + body.currently.temperature +
             ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain'
            )
        }
    })

}

module.exports = forecast