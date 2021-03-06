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

let token = "EAAG49plnuZCsBANoOaMrOjnPxVWZBhFyTPJZA0clT9Dc9Ipf5JSiw2d8SZCjdClHLQZA9vFpOoRx5jPOJkDN9422ZBVtZAQgWQZBQbeXFD4hOil84iOKwnH0M0vwiSeKVubvrEdSrfzKvuyjwu1aCAZAkv5Ut5Xbi5hw71enjFvpkZBAZDZD"
//Facebook

app.get('/webhook/', function(req, res){
    if(req.query['hub.verify_token'] == "armandobegazo"){
        res.send(req.query['hub.challenge'])
    }
    res.send("Token Equivocado")
})

app.post('/webhook/',function(req,res){
    let messaging_events = req.body.entry[0].messaging
    for(let i = 0; i< messaging_events.length; i++){
        let event = messaging_events[i]
        let sender = event.sender.id
       // let lat = event.message.attachments[0].payload.coordinates.lat
      //  let lng = event.message.attachments[0].payload.coordinates.long
        if(event.message && event.message.text){
            let text = event.message.text
            if(text.toUpperCase().includes("HOLA")){
            sendText(sender, "Como estas?")
            }else if(text.toUpperCase().includes("BIEN")){
            sendText(sender, "Yo aun soy un bot de prueba :(")
            }else{
            sendText(sender, "Me dijiste: " + text.substring(0,100))
            }
            console.log(text)

        }
        console.log(event.message)
      //  console.log(lat)
     //   console.log(lng)
        console.log(event.sender)
    }
    res.sendStatus(200)
})

function sendText(sender, text){
    let messageData = {text: text}
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {access_token: token},
        method: "POST",
        json:{
            recipient: {id: sender},
            message: messageData
        }
    }, function(error, response, body){
        if(error){
            console.log("sending error")
        } else if (response.body.error){
            console.log("response body error")
        }
    })
}

app.listen(app.get('port'), function(){
    console.log("corriendo: port")
})