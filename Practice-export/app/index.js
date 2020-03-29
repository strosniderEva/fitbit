import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import { me as appbit } from "appbit";
import { today} from "user-activity";
import { goals } from "user-activity";

if (appbit.permissions.granted("access_activity")) {
   console.log(`${today.adjusted.steps} Steps`);
   console.log(`${today.adjusted.elevationGain} Floor(s)`);
   console.log(`${today.adjusted.calories} Calories(s)`);
   console.log(`${today.adjusted.distance} Distance`);
   if (today.local.elevationGain !== undefined) {
    
   }
   if (goals.elevationGain !== undefined) {
     console.log(`${goals.elevationGain} Floor Goal`);
   }
  if (goals.calories !== undefined) {
     console.log(`${goals.calories} Calories Goal`);
   }
  
  if (goals.distance !== undefined) {
     console.log(`${goals.distance} Distance Goal`);
   }
  
}

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myClock = document.getElementById("myClock");
const txtSteps = document.getElementById("txtSteps");
const txtElev = document.getElementById("txtElev");
const txtDist = document.getElementById("txtDist");
const txtCal = document.getElementById("txtCal");
//const hexOne = document.getElementById("hexOne");
//const hexTwo = document.getElementById("hexTwo");
//const hexThree = document.getElementById("hexThree");


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  //Update step counter 
  let now = evt.date;
  let hours = now.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(now.getMinutes());
  myClock.text = `${hours}:${mins}`;
  
  if (appbit.permissions.granted("access_activity")) {
   let stepCount = today.adjusted.steps || 0;
   let elevation = today.adjusted.elevationGain || 0;
   let distance = today.adjusted.distance || 0;
   let calories = today.adjusted.calories || 0;
   
    txtSteps.text = 'Steps:' + stepCount.toString();
    txtElev.text = 'Floors:' + elevation.toString();
    txtDist.text = distance.toString() + 'm';
    txtCal.text = 'Cal:' + calories.toString();
  } 
  
  
    
  //COLORS!
  //Time  
  var time = now.getHours();
  switch(true){
       case (time <= 2):
      document.getElementById("hbgOne").style.fill = "#1e122a"; 
        break;
       case (time <= 4):
      document.getElementById("hbgOne").style.fill = "#753250"; 
        break;
       case (time <= 6):
      document.getElementById("hbgOne").style.fill = "#8e3b54"; 
        break;
       case (time <= 8):
        document.getElementById("hbgOne").style.fill = "#d97452"; 
        break;
       case (time <= 10):
        document.getElementById("hbgOne").style.fill = "#e6874f"; 
        break;
       case (time <= 14):
        document.getElementById("hbgOne").style.fill = "#f6e052"; 
        break;
       case (time <= 16):
        document.getElementById("hbgOne").style.fill = "#e6874f"; 
        break;
       case (time <= 18):
        document.getElementById("hbgOne").style.fill = "#d97452"; 
        break;
       case (time <= 20):
        document.getElementById("hbgOne").style.fill = "#8e3b54"; 
        break;
       case (time <= 22):
        document.getElementById("hbgOne").style.fill = "#753250"; 
        break;
       case (time <= 24):
        document.getElementById("hbgOne").style.fill = "#1e122a"; 
        break;
         }
  
  //Elevation
  var ec1 = 15;
  var ec2 = 6;
  var ec3 = 0;
  var elev = today.adjusted.elevationGain;
  //fixed it. accessing the variables of the goals object
  var elevGoal = goals.elevationGain;
  var elevMod = (elev / elevGoal) * 10;
    if(elevMod >9){
      ec1-=9
      ec2+=9
    }
    else{
      ec1 -= elevMod;
      ec2 += elevMod;
    }
    if(elevMod > 15){
      ec3 += 15;
    }
    else{
      ec3 += elevMod;
    }
  var elevColor = "#" + ec1.toString(16) + ec1.toString(16) + ec2.toString(16) + ec2.toString(16) + ec3.toString(16) + ec3.toString(16);
  document.getElementById("hbgThree").style.fill = elevColor;
  
  myClock.onclick = function(e) {
     console.log('click');
  }
  
}

