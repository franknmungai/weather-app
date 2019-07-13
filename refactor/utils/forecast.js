const request = require('request')

const forecast = (lat, lon, callback) => { //arguments expected: An object with coordinates and a callback. 
    const url = `https://api.darksky.net/forecast/360c43be3a576c6f8fdab4fef1b12ef1/${encodeURIComponent(lat)},${encodeURIComponent(lon)}?units=si`
    request({url, json: true}, (error, {body}) => { //response has been destructured, now we are accessing body property that has our data.
        
        if(error){
            callback('Unable to fetch weather forecast', undefined);
        }else if(body.error) {
            callback('Unable to find location', undefined);
        }else{
            const {daily, currently } = body  //destructuring the object body with our weather data. 
            callback(undefined, ` ${daily.data[0].summary} It is ${currently.temperature} degrees, and there is ${daily.data[0].precipProbability} chance of rain`
            );
        }    
    })
}

module.exports = forecast;