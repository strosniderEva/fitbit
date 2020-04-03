import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import { me as appbit } from "appbit";
import { me as device } from "device";
import { today} from "user-activity";
import { goals } from "user-activity";
import { primaryGoal } from "user-activity";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myClock = document.getElementById("myClock");
const txtSteps = document.getElementById("txtSteps");
const txtElev = document.getElementById("txtElev");
const txtDist = document.getElementById("txtDist");
const txtCal = document.getElementById("txtCal");
const steps = document.getElementById("stepsIcon");
const elev = document.getElementById("floorsIcon");
const dist = document.getElementById("distanceIcon");
const cal = document.getElementById("caloriesIcon");
const bee = document.getElementById("beeIcon");
const cal = document.getElementById("caloriesIcon");
const model = device.modelName;


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {

  //primary goal identifier
 if(model == "Ionic"){
   if(primaryGoal == "steps"){
      bee.x = 159;
      bee.y = 200;
   }
   else if(primaryGoal == "calories"){
      bee.x = 41;
      bee.y = 200;
   }
   else if(primaryGoal == "distance"){
      bee.x = 274;
      bee.y = 200;
   }
   else if(primaryGoal == "elevationGain"){
      bee.x = 218;
      bee.y = 94;
   }
   else{
     bee.x = 158;
     bee.y = 6;
   }
 }
 else if(model == "Versa"||model == "Versa Lite"||model == "Versa 2"){
    if(primaryGoal == "steps"){
      bee.x = 135;
      bee.y = 220;
   }
   else if(primaryGoal == "calories"){
      bee.x = 36;
      bee.y = 220;
   }
   else if(primaryGoal == "distance"){
      bee.x = 235;
      bee.y = 220;
   }
   else if(primaryGoal == "elevationGain"){
      bee.x = 184;
      bee.y = 125;
   }
   else{
     bee.x = 135;
     bee.y = 12;
   }    
   if(model == "Versa Lite"){
     document.getElementById("hbgThree").style.fill = "#1a4e7d"; 
     txtElev.style.fill = "#fcf8bd";
     elev.style.fill = "#fcf8bd";
   }
 }

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
  
   let stepCount = 0;
   let elevation = 0;
   let distance = 0;
   let calories = 0;
   let stepCountGoal = 0;
   let elevationGoal = 0;
   let distanceGoal = 0;
   let caloriesGoal = 0;
  
  if (appbit.permissions.granted("access_activity")) {
   stepCount = today.adjusted.steps || 0;
   elevation = today.adjusted.elevationGain || 0;
   distance = today.adjusted.distance || 0;
   calories = today.adjusted.calories || 0;
    
   stepCountGoal = goals.steps;
   elevationGoal = goals.elevationGain;
   distanceGoal = goals.distance;
   caloriesGoal = goals.calories;
   
    
    txtSteps.text = stepCount.toString();
    txtElev.text = elevation.toString();
    txtDist.text = distance.toString() + 'm';
    txtCal.text = calories.toString();
  } 
  
  
    
  //COLORS!
  //Time  
  var time = now.getHours();
  switch(true){
       case (time <= 2):
      document.getElementById("hbgOne").style.fill = "#1e122a"; 
        myClock.style.fill = "#fcf8bd";
        break;
       case (time <= 4):
      document.getElementById("hbgOne").style.fill = "#5c264a"; 
        myClock.style.fill = "#fcf8bd";
        break;
       case (time <= 6):
      document.getElementById("hbgOne").style.fill = "#a23b56"; 
        myClock.style.fill = "#fcf8bd";
        break;
       case (time <= 8):
        document.getElementById("hbgOne").style.fill = "#de614d"; 
        myClock.style.fill = "#1e122a";
        break;
       case (time <= 10):
        document.getElementById("hbgOne").style.fill = "#fe9b36";
        myClock.style.fill = "#1e122a";
        break;
       case (time <= 14):
        document.getElementById("hbgOne").style.fill = "#ffdf21";
        myClock.style.fill = "#1e122a";
        break;
       case (time <= 16):
        document.getElementById("hbgOne").style.fill = "#fe9b36"; 
        myClock.style.fill = "#1e122a";
        break;
       case (time <= 18):
        document.getElementById("hbgOne").style.fill = "#de614d"; 
        myClock.style.fill = "#1e122a";
        break;
       case (time <= 20):
        document.getElementById("hbgOne").style.fill = "#a23b56"; 
        myClock.style.fill = "#fcf8bd";
        break;
       case (time <= 22):
        document.getElementById("hbgOne").style.fill = "#5c264a"; 
        myClock.style.fill = "#fcf8bd";
        break;
       case (time <= 24):
        document.getElementById("hbgOne").style.fill = "#1e122a"; 
        myClock.style.fill = "#fcf8bd";
        break;
         }
  
  //Steps
  switch(true){
      case (stepCount <= (stepCountGoal*.19)):
        steps.style.fill = "#fcf8bd";
        steps.style.fill = "#fcf8bd";
        document.getElementById("hbgTwo").style.fill = "#61a722"; 
        break;
      case (stepCount <= (stepCountGoal*.39)):
        document.getElementById("hbgTwo").style.fill = "#7fb31c"
        steps.style.fill = "#fcf8bd";
        steps.style.fill = "#fcf8bd";
        break;
      case (stepCount <= (stepCountGoal*.59)):
        document.getElementById("hbgTwo").style.fill = "#9ebf17"; 
        steps.style.fill = "#fcf8bd";
        steps.style.fill = "#fcf8bd";
        break;
         case (stepCount <= (stepCountGoal*.79)):
        document.getElementById("hbgTwo").style.fill = "#bbcb15"; 
        txtSteps.style.fill = "#1e122a";
        steps.style.fill = "#1e122a";
        break;
      case (stepCount <= (stepCountGoal*.99)):
        document.getElementById("hbgTwo").style.fill = "#ded518"; 
        txtSteps.style.fill = "#1e122a";
        steps.style.fill = "#1e122a";
        break;
      case (stepCount >= (stepCountGoal)):
        document.getElementById("hbgTwo").style.fill = "#ffdf21"; 
        txtSteps.style.fill = "#1e122a";
        steps.style.fill = "#1e122a";
        break;
         
  }  
  
  //Calories
  switch(true){
      case (calories <= (caloriesGoal*.19)):
        document.getElementById("hbgFive").style.fill = "#c74529"; 
        txtCal.style.fill = "#fcf8bd";
        cal.style.fill = "#fcf8bd";
        break;
      case (calories <= (caloriesGoal*.39)):
        document.getElementById("hbgFive").style.fill = "#da6224";
        txtCal.style.fill = "#fcf8bd";
        cal.style.fill = "#fcf8bd";
        break;
      case (calories <= (caloriesGoal*.59)):
        document.getElementById("hbgFive").style.fill = "#ea801c";
        txtCal.style.fill = "#fcf8bd";
        cal.style.fill = "#fcf8bd";
        break;
         case (calories <= (caloriesGoal*.79)):
        document.getElementById("hbgFive").style.fill = "#f59f14"; 
        txtCal.style.fill = "#1e122a";
        cal.style.fill = "#1e122a";
        break;
      case (calories <= (caloriesGoal*.99)):
        document.getElementById("hbgFive").style.fill = "#febf13"; 
        txtCal.style.fill = "#1e122a";
        cal.style.fill = "#1e122a";
        break;
      case (calories >= (caloriesGoal)):
        document.getElementById("hbgFive").style.fill = "#ffdf21"; 
        txtCal.style.fill = "#1e122a";
        cal.style.fill = "#1e122a";
        break;
         
  }

  
  //Elevation
  switch(true){
      case (elevation <= (elevationGoal*.19)):
        document.getElementById("hbgThree").style.fill = "#1a4e7d"; 
        txtElev.style.fill = "#fcf8bd";
        elev.style.fill = "#fcf8bd";
        break;
      case (elevation <= (elevationGoal*.39)):
        document.getElementById("hbgThree").style.fill = "#0074a0"; 
        txtElev.style.fill = "#fcf8bd";
        elev.style.fill = "#fcf8bd";
        break;
      case (elevation <= (elevationGoal*.59)):
        document.getElementById("hbgThree").style.fill = "#0099a1"; 
        txtElev.style.fill = "#fcf8bd";
        elev.style.fill = "#fcf8bd";
        break;
         case (elevation <= (elevationGoal*.79)):
        document.getElementById("hbgThree").style.fill = "#00ba81";
        txtElev.style.fill = "#1e122a";
        elev.style.fill = "#1e122a";
        break;
      case (elevation <= (elevationGoal*.99)):
        document.getElementById("hbgThree").style.fill = "#85d44d"; 
        txtElev.style.fill = "#1e122a";
        elev.style.fill = "#1e122a";
        break;
      case (elevation >= (elevationGoal)):
        document.getElementById("hbgThree").style.fill = "#ffdf21"; 
        txtElev.style.fill = "#1e122a";
        elev.style.fill = "#1e122a";
        break;
         
  }
  
//Distance
 
  switch(true){
      case (distance <= (distanceGoal*.19)):
        document.getElementById("hbgFour").style.fill = "#911f53"; 
        txtDist.style.fill = "#fcf8bd";
        dist.style.fill = "#fcf8bd";
        break;
      case (distance <= (distanceGoal*.39)):
        document.getElementById("hbgFour").style.fill = "#bd3750"; 
        txtDist.style.fill = "#fcf8bd";
        dist.style.fill = "#fcf8bd";
        break;
      case (distance <= (distanceGoal*.59)):
        document.getElementById("hbgFour").style.fill = "#e05946"; 
        txtDist.style.fill = "#fcf8bd";
        dist.style.fill = "#fcf8bd";
        break;
         case (distance <= (distanceGoal*.79)):
        document.getElementById("hbgFour").style.fill = "#f88237"; 
        txtDist.style.fill = "#1e122a";
        dist.style.fill = "#1e122a";
        break;
      case (distance <= (distanceGoal*.99)):
        document.getElementById("hbgFour").style.fill = "#ffaf25";
        txtDist.style.fill = "#1e122a";
        dist.style.fill = "#1e122a";
        break;
      case (distance >= (distanceGoal)):
        document.getElementById("hbgFour").style.fill = "#ffdf21"; 
        txtDist.style.fill = "#1e122a";
        dist.style.fill = "#1e122a";
        break;
         
  }
}

