const {WebhookClient} = require('dialogflow-fulfillment');
const { request, response } = require('express');
const express= require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Server is up");
})

app.post('/webhook',express.json(),(request,response)=>{
     const agent = new WebhookClient({request:request, response:response}) 
     function fallback(agent){
         agent.add(`Bot does not understand this`);
     }

     function welcome(agent){
        agent.add(`Welcome to backend PIAIC bot`);
    }

    function Userdetails(agent){
        let user_name = agent.parameters["person"];
        let user_city = agent.parameters["geo-city1"];
        agent.add(`Welcome in new intent of Bot ${user_name.name} from ${user_city}`);
    }
    function add (agent){
        let number_01 = agent.parameters["number_01"]; 
        let number_02 = agent.parameters["number_02"];
        agent.add(`The sum of ${number_01} and ${number_02} is ${number_01+number_02}`);

    }

     let intentMap = new Map();
     intentMap.set('Default Fallback Intent',fallback);
     intentMap.set('Default Welcome Intent',welcome);
     intentMap.set('Userdetails',Userdetails);
     intentMap.set('calculations',add);
     agent.handleRequest(intentMap);
})

app.listen(4000,()=>{ console.log("Server is running on port 4000") })