function startMQTT() {

  console.log("MQTT: hey, let's get started!");

  // Create a client instance
  client = new Paho.MQTT.Client(mqtt.host, mqtt.port, mqtt.clientID);

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({userName:mqtt.user, password:mqtt.passwd, onSuccess:onConnect});


  // called when the client connects
  function onConnect() {
    console.log("onConnect");
    client.subscribe(mqtt.topic_sub);
    getTempHum();  
  }

  function getTempHum() {
    message = new Paho.MQTT.Message("getTempHum");
    message.destinationName = mqtt.topic_pub;
    client.send(message);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.destinationName);
    console.log("onMessageArrived:"+message.payloadString);

    var str = message.payloadString;

    if (message.destinationName == "rpi/status/temp/hum") {
      var temp = str.substring(str.indexOf("=")+1 ,str.lastIndexOf("*")); 
      var hum = str.substring(str.lastIndexOf("=")+1 ,str.lastIndexOf("%"));
//      displayTempHum(temp, hum);
      var html = "TEMP: "+temp+"°C";
      html += "<br/>RH: "+hum+"%";
      $('#tempHumDisplay').append(html);
    }
  }
}
