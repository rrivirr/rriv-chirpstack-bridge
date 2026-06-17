import { createServer } from "node:net";
import { Aedes } from "aedes";
import mqtt from "mqtt";

const mqttClient = await mqtt.connectAsync("http://mosquitto");
const port = 1883;

const aedes = await Aedes.createBroker();
const server = createServer(aedes.handle);

server.listen(port, function () {
  console.log("server started and listening on port ", port);
});

aedes.on("publish", async (packet, client) => {
  if (packet.topic.startsWith("us915_1/gateway/")) {
    await mqttClient.publishAsync(packet.topic, packet.payload);
  }
});
