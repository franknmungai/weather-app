const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

//setting up handle bars template engine.
app.set('view engine', 'hbs')   /*we use app.set() to set a value to an Express setting. 
The key is the setting name and the value is the value we want to set for the setting. The setting for our view engine is 'view engine'
and the value is the hbs module*/

//Customizing the path to views/templates directory in Express.
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath) //setting the path of the views directory (templates) we would like to use in our settings.

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)  //registerPartials() takes in a path to where your partials live

let pageVisits = 0
//Creating a handler for a http get request. we use res.render to render a view
app.get('', (req, res) => {
    res.render('index', {   //the object contains dynamic values to be referenced in our hbs file --> partials
        title: 'Weather ',
        name: 'Frank'
    })
    pageVisits++
    console.log(pageVisits)

})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Frank',
        title: 'About me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'To get the help you need from our reference docs here',
        name: 'Frank'
    })
})

//creating an end point that sends back products to be displayed on the browser from our node app.
app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({   //we use return to stop the rest of the funtion after this block from executing
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//serving up contents from a folder, giving its absolute path. 
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))  //use method helps us customize our server. we are customizing our server to serve up static files from a root directory using express.static()


//adding a route that returns a json response
app.get('/api', (req, res) => {
    res.send({
        name: 'Jean',
        age: 19
    })
})

//adding a route that returns an array of json objects
app.get('/users', (req,res) => {
    res.send([
        {
            name: 'Murray'
        },
        {
            name: 'Sarah'
        },
        {
            name: 'Jean'
        }
    ])
})

//wow, sending data to the browser from our backend. Creating a http json end point
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide a search term'
        })
    }   //if there is an address...
    
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error
            })
        }

        const {longitude, latitude, location} = data    //destructure the argument (object)

        forecast(longitude, latitude, (error, forecastData) => {

            if(error){
                return res.send({
                    error
                })
            }
            res.send({  //return a json object with the weather data.
                location,
                weather: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/my-weather', (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon
    forecast(lat, lon, (error, weatherForecast) => {
        if (error){
            return res.send({error})
        }
        res.send({weatherForecast})
        console.log(weatherForecast)
    })
})
//for a route that is not specified within /help
app.get('/help/*', (req, res) => {
    res.render('404-page', {    //the object paramters contains the dynamic value to be reference on our hbs 404 file
        title: "404 page",
        name: "Jean",
        message: 'Help article not found',
        back: "Home"
    })
})

app.get('*', (req, res) => {    // '*' matches any other route we have not set to show a 404 page

    res.render('404-page', {
        title: "404 Page",
        name: "Jean",
        message: 'Page not found',
        back: "Home"
    })
})



//serving up a client with a directory. We need to provide an absolute path, taking advantage of two variables Node.js provides.
console.log(__dirname)  //provides a path to the directory the current script lives in. 
//console.log(__filename) //provides a path to the current script from the root of the machine

//join() --> Join all arguments together and normalize the resulting path
console.log(path.join(__dirname, '../public'))


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})