console.log('Client side JavaScript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //making our http get request
    fetch(`http://localhost:3000/weather?address=${location}`)  //fetching data from our json end point. (remember our weather route handler returns json so we are fetching it.)
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