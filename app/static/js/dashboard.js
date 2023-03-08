window.onload = (event) => {
    
  console.log('dashboard page is fully loaded');
  
  var mqtt;
  var connected_flag      =  0	
  var reconnectTimeout    = 2000;  
  var pubtopic            = "620150823_lab3";       //Replace with your ID number ex. 620012345_lab3  
  var subtopic            = "620150823";            //Replace with your ID number ex. 620012345. MQTT topic for subscribing to
  var host                = "www.yanacreations.com";  // MQTT HOST
  var port                = 8883;                     // MQTT Port
  
  /* HTML ELEMENT SELECTORS */
  // Query selector objects used to manipulate HTML elements
  let printMessage        = document.querySelector("#messages");          // Query by HTML Element's id. Select <div> element
  let printStatus         = document.querySelector("#status"); 

  let kitchenCard         = document.querySelector(".kitchen > p");       // Query by HTML class & element type. Select <p> element
  let kitchenCardBtn      = document.querySelector(".kitchen > button");  // Query by HTML class & element type. Select <button> element

  let livingroomCard         = document.querySelector(".livingroom > p");       // Query by HTML class & element type. Select <p> element
  let livingroomCardBtn      = document.querySelector(".livingroom > button");  // Query by HTML class & element type. Select <button> element

  let bedroomCard         = document.querySelector(".bedroom > p");       // Query by HTML class & element type. Select <p> element
  let bedroomCardBtn      = document.querySelector(".bedroom > button");  // Query by HTML class & element type. Select <button> element

  let bathroomCard         = document.querySelector(".bathroom > p");       // Query by HTML class & element type. Select <p> element
  let bathroomCardBtn      = document.querySelector(".bathroom > button");  // Query by HTML class & element type. Select <button> element

  let studyroomCard         = document.querySelector(".studyroom > p");       // Query by HTML class & element type. Select <p> element
  let studyroomCardBtn      = document.querySelector(".studyroom > button");  // Query by HTML class & element type. Select <button> element

  let hallCard         = document.querySelector(".hall > p");       // Query by HTML class & element type. Select <p> element
  let hallCardBtn      = document.querySelector(".hall > button");  // Query by HTML class & element type. Select <button> element

  

  let frontdoorCard       = document.querySelector(".frontdoor > p"); 
  let balconydoorCard     = document.querySelector(".balconydoor > p"); 

  let limit = 10;

  /* EVENT LISTENERS */
  kitchenCardBtn.addEventListener("click",()=>{ 
        console.log("Kitchen Button clicked");

        // Send message
        let message = {"message":"toggle","sensor":"KITCHEN"};
        send_message(JSON.stringify(message));
  });

  
  livingroomCardBtn.addEventListener("click",()=>{ 
    console.log("Living Room Button clicked");

    // Send message
    let message = {"message":"toggle","sensor":"LIVINGROOM"};
    send_message(JSON.stringify(message));
});

bedroomCardBtn.addEventListener("click",()=>{ 
  console.log("BedRoom Button clicked");

  // Send message
  let message = {"message":"toggle","sensor":"BEDROOM"};
  send_message(JSON.stringify(message));
});

bathroomCardBtn.addEventListener("click",()=>{ 
  console.log("Bath Room Button clicked");

  // Send message
  let message = {"message":"toggle","sensor":"BATHROOM"};
  send_message(JSON.stringify(message));
});

studyroomCardBtn.addEventListener("click",()=>{ 
  console.log("Study Room Button clicked");

  // Send message
  let message = {"message":"toggle","sensor":"STUDYROOM"};
  send_message(JSON.stringify(message));
});

hallCardBtn.addEventListener("click",()=>{ 
  console.log("Hall Button clicked");

  // Send message
  let message = {"message":"toggle","sensor":"HALL"};
  send_message(JSON.stringify(message));
});


  /* MQTT FUNCTIONS  */  
  onMessageArrived = (r_message)=>{    
      
      try{
        // Convert message received to json object
        let mssg  = JSON.parse(r_message.payloadString); 

        // Print json message to console(View in Browser Dev Tools)
        console.log(mssg); 

        if(mssg.TYPE == "SENSOR"){   
          // Update webpage 
          kitchenCard.innerHTML       =  mssg.KITCHEN;
          livingroomCard.innerHTML    =  mssg.LIVINGROOM;
          studyroomCard.innerHTML     =  mssg.STUDYROOM; 
          bedroomCard.innerHTML       =  mssg.BEDROOM;
          bathroomCard.innerHTML      =  mssg.BATHROOM;
          hallCard.innerHTML          =  mssg.HALL;

          frontdoorCard.innerHTML     =  mssg.FRONTDOOR; 
          balconydoorCard.innerHTML   =  mssg.BALCONYDOOR; 
          
          let timestamp = mssg.TIMESTAMP;
          let temperature = mssg.OUTTEMP; 

          if(limit > 0){
            liveGraph.series[0].addPoint({y:parseFloat(temperature) ,x:((parseInt(timestamp) - 18000 )*1000) }, true, false);
            limit--;
          }
          else{
            liveGraph.series[0].addPoint({y:parseFloat(temperature) ,x:((parseInt(timestamp) - 18000 )*1000) }, true, true);
          }

          //KITCHEN
          if (mssg.KITCHEN=="ON"){
            // document.getElementById('Bulb').src= Bulb.src.replace("offlights.svg", "ONbulb.svg") ; 
            document.getElementById('KBulb').style.display='NONE'; 
            document.getElementById('KONBulb').style.display='block';     
            
          }else {
            // document.getElementById('Bulb'); 
            document.getElementById('KONBulb').style.display='NONE';  
            document.getElementById('KBulb').style.display='block';   
          }

          if (mssg.LIVINGROOM=="ON"){
            // document.getElementById('Bulb').src= Bulb.src.replace("offlights.svg", "ONbulb.svg") ;
            document.getElementById('LBulb').style.display='none';
            document.getElementById('LONBulb').style.display='block';    
           
          }else {
            // document.getElementById('Bulb');
            document.getElementById('LONBulb').style.display='NONE';  
            document.getElementById('LBulb').style.display='block';  
          }

          
          //STUDYROOM
          if (mssg.STUDYROOM=="ON"){
            // document.getElementById('Bulb').src= Bulb.src.replace("offlights.svg", "ONbulb.svg") ;
            document.getElementById('SBulb').style.display='none';
            document.getElementById('SONBulb').style.display='block';    
           
          }else {
            document.getElementById('SONBulb').style.display='NONE';  
            document.getElementById('SBulb').style.display='block';  
          }

          //BEDROOM
          if (mssg.BEDROOM=="0"){
            // document.getElementById('Bulb').src= Bulb.src.replace("offlights.svg", "ONbulb.svg") ;
            document.getElementById('BeONBulb').style.display='NONE';  
            document.getElementById('BeBulb').style.display='block';
           
          }else {
            // document.getElementById('Bulb');
            document.getElementById('BeBulb').style.display='none';
            document.getElementById('BeONBulb').style.display='block'; 
          }
          //BATHROOM
          if (mssg.BATHROOM=="ON"){
            // document.getElementById('Bulb').src= Bulb.src.replace("offlights.svg", "ONbulb.svg") ;
            document.getElementById('BaBulb').style.display='none';
            document.getElementById('BaONBulb').style.display='block';    
           
          }else {
            // document.getElementById('Bulb');
            document.getElementById('BaONBulb').style.display='NONE';  
            document.getElementById('BaBulb').style.display='block';  
          }
          //HALL
          if (mssg.HALL=="ON"){
            // document.getElementById('Bulb').src= Bulb.src.replace("offlights.svg", "ONbulb.svg") ;
            document.getElementById('HBulb').style.display='none';
            document.getElementById('HONBulb').style.display='block';    
           
          }else {
            // document.getElementById('Bulb');
            document.getElementById('HONBulb').style.display='NONE';  
            document.getElementById('HBulb').style.display='block';  
          }

           //FRONTDOOR
           if (mssg.FRONTDOOR=="CLOSED"){
        
            document.getElementById('FDO').style.display='none';
            document.getElementById('FDC').style.display='block';    
           
          }else {
            
            document.getElementById('FDC').style.display='NONE';  
            document.getElementById('FDO').style.display='block';  
          }

          //BALCONYDOOR
          if (mssg.BALCONYDOOR=="CLOSED"){
        
            document.getElementById('BDO').style.display='none';
            document.getElementById('BDC').style.display='block';    
           
          }else {
            
            document.getElementById('BDC').style.display='NONE';  
            document.getElementById('BDO').style.display='block';  
          }

        }
        // console.log(mssg.KITCHEN);

      }
      catch (error){
          console.error(error);
      }
   
         
  }
  


  var elevationData = [ ];
  let start = document.querySelector("#start"); 
  let end = document.querySelector("#end"); 
  let plotBtn = document.querySelector(".plot"); 

  // Add event listener which sends fetch request to server once plot button is clicked
  plotBtn.addEventListener("click", async ()=>{ 
      let starttime = new Date(start.value).getTime() / 1000;
      let endtime = new Date(end.value).getTime() / 1000;

      // Request data from server
      const URL = `/data?start=${starttime}&end=${endtime}&variable=OUTTEMP`;
      const response = await fetch(URL);
      if(response.ok){
          let res = await response.json();

          elevationData = [res];
          //Print data received to console
          console.log(elevationData); 

          // Render plot with received data
          graph.update({
            series: [{
              data: res,
              lineColor: Highcharts.getOptions().colors[1],
              color: Highcharts.getOptions().colors[2],
              fillOpacity: 0.5,
              name: 'Temperature',
              marker: {
                enabled: false
              },
              threshold: null
            }]
        });
  }
  });

/* GRAPH */
graph = Highcharts.chart('container', {
    chart:{
      type: 'area',
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
      scrollablePlotArea: {
        minWidth: 600
      }
    },

    title:{
      text: 'Average Outside Temperature',
      align: 'center'
    },

    xAxis:{
      type: "datetime"
    },

    yAxis:{
      startOnTick: true,
      endOnTick: false,
      maxPadding: 0.35,
      title:{
        text: null
      },
      labels:{
        format: '{value} °C'
      } 
    },

    tooltip:{
      // headerFormat: 'Distance: {point.x:.1f} km<br>', 
      pointFormat: '{point.y:.1f} °C',
      shared: true
    },

    legend: {
      enabled: false
    },

    series: [{
      data: elevationData,
      lineColor: Highcharts.getOptions().colors[1],
      color: Highcharts.getOptions().colors[2],
      fillOpacity: 0.5,
      name: 'Temperature',
      marker: {
        enabled: false
      },
      threshold: null
      }]
});

// Render live Graph
liveGraph = Highcharts.chart('livedata', {
  chart: {
    type: 'spline',
    zoomType: 'x',
    panning: true,
    panKey: 'shift',
    scrollablePlotArea: {
      minWidth: 600
    }
  },

  title: {
    text: 'Live Temperature Data',
    align: 'center'
  }, 

  xAxis: {
    type: "datetime"
  },

  yAxis: {
    startOnTick: true,
    endOnTick: false,
    maxPadding: 0.35,
    title: {
      text: null
    },
    labels: {
      format: '{value} °C'
    } 
  },

  tooltip: {
    // headerFormat: 'Distance: {point.x:.1f} km<br>',
    pointFormat: '{point.y:.1f} °C',
    shared: true
  },

  legend: {
    enabled: false
  },

  series: [{
    data: [],
    lineColor: Highcharts.getOptions().colors[3],
    color: Highcharts.getOptions().colors[2],
    fillOpacity: 0.5,
    name: 'Temperature',
    marker: {
      enabled: false
    },
    threshold: null
  }]
});
  
  onConnectionLost = ()=>{
      console.log("connection lost"); 
      printMessage.classList.remove("mqttConnected");
      printMessage.classList.add("mqttdisconnected");
      setTimeout(connect,3000);
    }
    
    
  onFailure = (message) => {
    console.log("Failed"); 
    printMessage.classList.remove("mqttConnected");
    printMessage.classList.add("mqttdisconnected");
    setTimeout(MQTTconnect, reconnectTimeout);
  }
    

  onConnected = (recon,url)=>{
    console.log(" in onConnected " +recon);
  }
  
  onConnect = ()=>{
   // Once a connection has been made, make a subscription and send a message. 
  connected_flag          = 1 
  printMessage.classList.add("mqttConnected");
  printMessage.classList.remove("mqttDisconnected");
  console.log(`on Connect ${connected_flag}`); 
  sub_topics();
   }
  
  
  makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
  }
  
  var IDstring = makeid(12);
  
  MQTTconnect = ()=> {
  
  console.log(`connecting to  ${host}   ${port}`);
  mqtt = new Paho.MQTT.Client( host ,port,IDstring);
  
 
  var options = {
          timeout: 3,
          onSuccess: onConnect,
          onFailure: onFailure,   
          useSSL:true  
       };
  
  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;
  mqtt.onConnected = onConnected;
  mqtt.connect(options);
  return false;
   
   
  }
  
  
  sub_topics = ()=>{   
  console.log("Subscribing to topic = "+ subtopic);
  mqtt.subscribe(subtopic);
  return false;
  }
  
  send_message = (msg)=>{

    printStatus.innerHTML ="";
    if (connected_flag == 0){
        out_msg="<b style='color:red'> Not Connected so can't send </b>"
        console.log(out_msg);
        printStatus.innerHTML = out_msg;
        setTimeout(function(){ printStatus.innerHTML = " ";  }, 3000);
        return false;
    }
    else{  
        // Send message                   
        var message = new Paho.MQTT.Message(msg);
        message.destinationName = pubtopic;
        mqtt.send(message);
        return true;
        }   
  }
  
  // Connect to MQTT broker
  MQTTconnect();
  
  
  };