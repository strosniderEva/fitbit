import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import { me as appbit } from "appbit";
import { today } from "user-activity";

if (appbit.permissions.granted("access_activity")) {
   console.log(`${today.adjusted.steps} Steps`);
   if (today.local.elevationGain !== undefined) {
     console.log(`${today.adjusted.elevationGain} Floor(s)`);
   }
}

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const txtSteps = document.getElementById("txtSteps");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  
  txtSteps.text = 'Steps:';
  //console.log(`${today.adjusted.steps} `);
  
}
