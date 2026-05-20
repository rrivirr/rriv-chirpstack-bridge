const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://mqtt.rriv.com', { 'clientId': 'rriv'} )

client.on('connect', function () {
  console.log('Connected')
  client.subscribe('/application/uplink/0000000000000070', function (err) {
   // if (!err) {
    //  client.publish('presence', 'Hello mqtt')
   // }
  })
  client.subscribe('/application/uplink/0000000000000071', function (err) {
   // if (!err) {
    //  client.publish('presence', 'Hello mqtt')
  })
  client.subscribe('/application/uplink/0000000000000072', function (err) {
   // if (!err) {
    //  client.publish('presence', 'Hello mqtt')
  })
})

client.on('error', function() {
  console.log("uh")
})

client.on('message', function (topic, message) {
  // message is Buffer
  //console.log(message.toString())
  const messageJSON = JSON.parse(message.toString('utf8'))
 // console.log(messageJSON.data)
  let data = messageJSON.data
  let buff = new Buffer.from(data, 'base64')
  let text = buff.toString('ascii')
  let devEUI = messageJSON.devEUI;
  console.log(devEUI)
  console.log(text)
  //SN:BB8100012070,SQ:0,FR:0.000,PM:0,TA:0,POD:0.00,PWT:0.00
  let dataArray = text.split(',');
  let flowRate = dataArray[2].substring(3);
  console.log(flowRate);
  let payload = '{}';
  let pubTopic = devEUI;
  client.publish(pubTopic, payload)
})
