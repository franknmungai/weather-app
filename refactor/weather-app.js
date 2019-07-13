const path = require('path')
const express = require('express')

//creating an instance of our express application
const app = express()   
const request = require('request')
const hbs = require('hbs')

//loading in geocode and forecast modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//configuring the view engine setting
app.set('view engine', 'hbs')

console.log(__dirname)
//setting the path to our templates
const viewsPath = path.join(__dirname, '/utils/resource/views')
app.set('views', viewsPath) 

//registering our partials
const partials_path = path.join(__dirname, '/utils/resource/partials')
hbs.registerPartials(partials_path)

//creating our route handlers

app.get('', (request, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Frank'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Frank'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})