import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import { me as appbit } from "appbit";
import { today} from "user-activity";
import { goals } from "user-activity";

if (appbit.permissions.granted("access_activity")) {
   console.log(`${today.adjusted.steps} Steps`);
   if (today.local.elevationGain !== undefined) {
     console.log(`${today.adjusted.elevationGain} Floor(s)`);
   }
  //Cant access goals on simulator????
  // if (goals.local.elevationGain !== undefined) {
  //    console.log(`${goals.adjusted.elevationGain} Floor Goal`);
  //  }
}

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myClock = document.getElementById("myClock");
const txtSteps = document.getElementById("txtSteps");
const txtElev = document.getElementById("txtElev");
const hexOne = document.getElementById("hexOne");
const hexTwo = document.getElementById("hexTwo");
const hexThree = document.getElementById("hexThree");


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
   
    txtSteps.text = 'Steps:' + stepCount.toString();
    txtElev.text = 'Floors:' + elevation.toString();
  } 
  
  
    
  //COLORS!
  //Time
  //consider making this more gradual based on the hour
  if(now.getHours() <=12){  //use raw time to check if am or pm. colors are temporary
    //AM blue
    document.getElementById("hbgOne").style.fill = "blue";    
  }
  else{
    //PM red
    document.getElementById("hbgOne").style.fill = "red";
  }
  
  //Elevation
  //orange = ground, blue = sky
  //color goes from brown to blue as user gets closer to goal.
  var ec1 = 15;
  var ec2 = 6;
  var ec3 = 0;
  var elev = today.adjusted.elevationGain;
  // var elevGoal = goals.local.elevationGain
  //cant access goals on simulator??
  var elevGoal = 10;
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
  
  
  
  
  
  
  
  
  //doesn't work yet
  myClock.onclick = function(e) {
     console.log('click');
  }
  
}




