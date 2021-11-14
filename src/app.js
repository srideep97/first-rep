const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const PublicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')
const viewsPath = path.join(__dirname,'../templates/views')


app.use(express.static(PublicDirectoryPath))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Home Page',
        name: 'Srideep'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About Page',
        name: 'Srideep'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help Page',
        name: 'Srideep'
    })
})

app.get('/weather', (req,res)=> {
    if(req.query.address){
        geocode(req.query.address, (error, response) => {
            if(error){
                return res.send({
                    error: 'Error'
                })
            }
            
            forecast(response.Latitude, response.Longitude, (error, forecastData) => {
              if(error)
                {
                    return res.send({
                        error: 'Error'
                    })
                }      
              res.send({
                  data: forecastData
              })
            })
        })
    }
    else {
        res.send({
            errorA : 'address error'
        })
    }
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Srideep'
    })
})


app.listen(port, () => {
    console.log('The server is set on port' + port + 'and ready to render')
})