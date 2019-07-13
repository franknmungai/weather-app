const express = require('express')

/*unlike most modules, express returns a function instead of an object. 
So our express const above is actually a function. We call it to create a new express application */

/*create a new variable to store your express application.
 We configure the server by using various methods provided by the application itself*/
const app = express()

/*Say for example we had a domain app.com. When someone vits app.com, we want to show them something, maybe the homepage for our 
 company website  but we'll still have other pages as well such as app.com/help and app.com/about. So we have one domain, 
 and all of it is going to run in a single express server. And we have also set up multiple routes; root, help, about
 So we have to setup our server to send a response when someone tries to access something from a specific route. 

 we use a method app.get () to configure what the server should do when someone tries to get a resource at a specific url. 
 It takes in the specific url (partial url)/ route e.g /about, and a callback function. 
 In this function, we define what we want to do when someone visits that particular route. It describes what to send back to them,either html
 or json. That function gets called with two arguments, the first one is request (simply req), this parameter is an object containing information
 about the incoming requests to the server. The second argument that is called with the method is the response. It has a bunch of methods
 that allow us to customize what we want to send back to the requestor. 
 */

 /* we look at the request to figure out what we want to do, e.g read data from a database, or create some html. We use various methods on
 response to send a response back*/

app.get('', (req, res) => { //request and response

    res.send('<h1>Weather</h1>') //this allows us to send something back to the requestor. 
})

//adding another route
app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About Us')
})

app.get('/weather', (req, res) => { //req gives information about the request
    res.send('Weather forecast')
})



//Finally, start the server. We will listen for on a development port. We can add an optional argument which is a callback function
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

//you'll note that a webserver never stops unless we stop it ourselves. It stays on listening for any incoming requests.
/*When we visit that url in our browser [localhost: 3000], it goes on to our server. 
Our server finds the matching route -root, and processed our response 
using our handler*/