import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import { me as appbit } from "appbit";
import { today, goals } from "user-activity";

if (appbit.permissions.granted("access_activity")) {
   console.log(`${today.adjusted.steps} Steps`);
   if (today.local.elevationGain !== undefined) {
     console.log(`${today.adjusted.elevationGain} Floor(s)`);
   }
}

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const txtSteps = document.getElementById("txtSteps");

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
  myLabel.text = `${hours}:${mins}`;
  
  if (appbit.permissions.granted("access_activity")) {
   let stepCount = today.adjusted.steps || 0;
    txtSteps.text = 'Steps:' + stepCount.toString();
    console.log("stepCount = " + stepCount.toString());
  }
  
  
  
}



