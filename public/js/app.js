const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const myLocationButton = document.querySelector('.location-button')

weatherForm.addEventListener('submit', (e) => {
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //making our http get request (to the json end point)
    fetch(`/weather?address=${location}`)  //fetching data from our json end point. (remember our weather route handler returns json so we are fetching it.)
    .then((response) => {
        return response.json()  //return the parsed json as the response
    })
    .then((data) => {   //receive the object response and do something with it.
        if(data.error){
            return messageOne.textContent = data.error
        }
        const {location, weather} = data
        messageOne.textContent = location
        messageTwo.textContent = weather
    })
    .catch(error => console.log(error))
    e.preventDefault() 
})

const geoLocation = () => {
    if(!navigator.geolocation) {
        return alert('Your browser does not have support for geolocation')
    }
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    navigator.geolocation.getCurrentPosition((location) => {
        const lat = location.coords.latitude
        const lon = location.coords.longitude  
        console.log(location)
        
        fetch(`/my-weather?lat=${lat}&lon=${lon}`)
        .then(response => {
            return response.json()
        })
        .then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error
            }

            messageTwo.textContent = data.weatherForecast
            messageOne.textContent = ''
        })
    })

}
myLocationButton.addEventListener('click', geoLocation)


