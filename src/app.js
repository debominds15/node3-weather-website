const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { geocode, reverseGeocode } = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

//Define path for Express config
const publicDirectory = path.join(__dirname, '../public')

//Define partial hbs path 
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

//To customize view directory
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views',viewsPath)

//Set up handlebars engine
app.set('view engine', 'hbs')
app.use(express.static(publicDirectory))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Debojyoti Banik'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Debojyoti Banik',
        helptext: 'Hey please help yourself!'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About weather',
        name: 'Debojyoti Banik'
    })
})

/*app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>')
})

app.get('/help',(req, res) => {
    res.send({
        name: 'Debojyoti',
        age: 27
    })
})

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
})*/



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must enter address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        
        //forecast(latitude, longitude, (error, { temperature,precipitationProbablity: precipProbability}) => {
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
    
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
    })
    /*res.send({
        forecast: 'It is sunny',
        location: 'Bangalore',
        address: req.query.address
    })*/
})

app.get('/locate', (req, res) => {        
            reverseGeocode(req.query.lon, req.query.lat, (error, { latitude, longitude, location} = {}) => {
                if(error){
                    return res.send({
                        error: error
                    })
                }
                                
                forecast(latitude, longitude, (error, forecastData) => {
                    if(error){
                        return res.send({
                            error: error
                        })
                    }
                                
                    res.send({
                        forecast: forecastData,
                        location: location,
                    })
                  })
            })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must enter a search term!'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Debojyoti'
    })
})
app.get('*',(req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Debojyoti'
    })
})

app.listen(port, () => {
    console.log('Server is up at '+ port);
    
})