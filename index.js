'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port',(process.env.PORT || 5000))
//Para permitir procesar la data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//ROUTES

app.get('/', function(req, res) {
    res.send("Hola soy un Bot")
})

//Facebook

app.get('/webhook/', function(req, res){
    if(req.query['hub.verify_token'] == "armandobegazo"){
        res.send(req.query['hub.challenge'])
    }
    res.send("Token Equivocado")
})

app.listen(app.get('port'), function(){
    console.log("corriendo: port")
})