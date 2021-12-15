exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();

    if(event.To) {
      // Wrap the phone number or client name in the appropriate TwiML verb
      // if is a valid phone number
      const attr = isAValidPhoneNumber(event.To) ? 'number' : 'client';
      if(event.To == '<TwilioPhoneNumber>')	//Put the Twilio phone number to be used for this sample here
      {
        const dial = twiml.dial({
            callerId: event.From,
        });
        dial['client']({}, 'TwilioSampleIntegDemo');    //Choose a suitable client name here
      }
      else {
        const dial = twiml.dial({
            callerId: context.CALLER_ID,
        });
        dial[attr]({}, event.To);
      }
    } else {
      twiml.say('No dialing To no. found!');
    }

     callback(null, twiml);
};

/**
* Checks if the given value is valid as phone number
* @param {Number|String} number
* @return {Boolean}
*/
function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}
