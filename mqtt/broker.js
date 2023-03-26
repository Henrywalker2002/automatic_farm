var mosca = require('mosca')

var ascoltatore = {
    type : 'mongo',
    url : 'mongodb://127.0.0.1:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

var settings = {
    port: 1883
}

var server = new mosca.Server(settings);

server.authenticate = function(client, username, password, callback) {
    console.log(username, password)
    callback(null, mosca.Authorizer)
}

server.on("clientConnected", function(client) {
    console.log(client.id)
})

server.on('published', function(packet, client) {
    console.log('Published', packet.topic, packet.payload.toString());
  });

server.on('ready', setup);

function setup() {
    console.log('Mosca server is up and running');
}