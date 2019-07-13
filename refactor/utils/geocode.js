const request = require('request');

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZnJhbmstbXVuZ2FpIiwiYSI6ImNqeHJqNnNwczA0enIzZGxnd3hodzFqd3oifQ.38AnrVooHAtmRpXChy-K6Q&limit=1`
    request({ url, json: true }, (error, response) => {
        
        if(error){
            callback('Unable to connect to location services', undefined); //passing the error back to the callback
        }else if(response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        }else{  //we successfully get our data back. 
            const {features} = response.body    //destructuring an object
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    })

}

module.exports = geocode;