<<<<<<< HEAD
// // const mqtt = require('mqtt');
// // const client = mqtt.connect("mqtt://test.mosquitto.org",1883,0, {clientId:"mqtt-tester"});
// // client.on('connect', function() {
// //     console.log("Connected");
// // });
// // client.on('error', function(error) {
// //     console.log("Unable to connect: " + error);
// //     process.exit(1);
// // });
// //publisher.js 
// const mqtt = require('mqtt') 
// require('dotenv').config() 

// //the client id is used by the MQTT broker to keep track of clients and and their // state
// const clientId = 'mqttjs_' + Math.random().toString(8).substr(2, 4) 
// const client  = mqtt.connect(process.env.BROKER_URL, {clientId: clientId, clean: false}); 

// // console.log(process.env.BROKER_URL, 'client', clientId) 

// const topicName = 'test/connection' 

// client.on("connect",function(connack){   
//    console.log("client connected", connack); 
// // on client connection publish messages to the topic on the server/broker  
//   const payload = {1: "Hello world", 2: "Welcome to the test connection"} 
//   client.publish(topicName, JSON.stringify(payload), {qos: 1, retain: true}, (PacketCallback, err) =&gt; { 

//       if(err) { 
//           console.log(err, 'MQTT publish packet') 
//       } 
//   }) 

//   //assuming messages comes in every 3 seconds to our server and we need to publish or process these messages 
//   setInterval(() =&gt; console.log("Message published"), 3000); 
// }) 

// client.on("error", function(err) { 
//     console.log("Error: " + err) 
//     if(err.code == "ENOTFOUND") { 
//         console.log("Network error, make sure you have an active internet connection") 
//     } 
// }) 

// client.on("close", function() { 
//     console.log("Connection closed by client") 
// }) 

// client.on("reconnect", function() { 
//     console.log("Client trying a reconnection") 
// }) 

// client.on("offline", function() { 
//     console.log("Client is currently offline") 
// })  
=======
const mqtt = require("mqtt");

var client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  client.subscribe("something111");
  console.log("client has subscribed");
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  // client.end();
});
>>>>>>> cea8855a3d7c300d09502e7b4cd75e26f19d7bc1
