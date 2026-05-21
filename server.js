const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost:8000', { 'clientId': 'rriv'} )
const bridged = mqtt.connect('mqtt://localhost:8001');

client.on('connect', function () {
  console.log('Connected')
  client.subscribe('us915_2/gateway/#', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

bridged.on('connect', function() {
  console.log("Bridged");
})

client.on('error', function() {
  console.log("error")
})

client.on('message', function (topic, message) {
  console.log(topic);
  console.log(message);
  bridged.publish(topic, message)
})
