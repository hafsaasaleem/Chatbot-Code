const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');
const app = express().use(bodyParser.json());

require("./mongoose")
require("./model/post")

var model = mongoose.model("ReqData")

app.post("/webhook", express.json(), (request, response, next) => {

    const agent = new WebhookClient({ request: request, response: response });

    function welcome(agent) {
        agent.add("Welcome from Hafsa");
    }

    function hotel_book(agent) {
        let name = agent.parameters.name;
        let email = agent.parameters.email;
        let person = agent.parameters.person;
        let roomtype = agent.parameters.roomtype;
        let data = {
            name: name.name,
            email: email,
            person: person,
            roomtype: roomtype
        }
        return saveData(data)
            .then(resValue => {
                return agent.add(`${resValue}`)
            })
            .catch(() => {
                agent.add("Record is not inserted");
            })
        // agent.add(`Thank you ${name.name} You book ${person} people room and type of ${roomtype} we will informed you for your booking on ${email}`)
    }

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome)
    intentMap.set("Book-Hotel", hotel_book)
    agent.handleRequest(intentMap);

})

function saveData(data) {
    let promise = new Promise((resolve, reject) => {
        var saveData = new model(data);
        saveData.save()
            .then((resData => {
                resolve(`Thank you ${data.name} You book ${data.person} people room and type of ${data.roomtype} we will informed you for your booking on ${data.email}`)
            }))
            .catch(e => {
                reject(e)
            })
    })
    return promise
}

app.listen(6000, () => { console.log("The server is up on port 6000") })
