var mqtt = require('mqtt')
var settings = {
    mqttServerUrl : "1a4b5f6bd3224e0e8740003ba2909981.s2.eu.hivemq.cloud", 
    port : 8883,
    topic : "myTopic",
    }
var client  = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port, {username : "henrywalker", password : "password"});

client.on('connect', function () {
    client.subscribe(settings.topic)
    console.log("Subscribed topic " + settings.topic);
})

client.on('message', function (topic, message) {
    console.log(message.toString());
})