exports.handler = function (context, event, callback) {

    let response = new Twilio.Response();

    // Add CORS Headers
    let headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json"
    };

    // Set headers in response
    response.setHeaders(headers);

    response.setStatusCode(200);

    let ClientCapability = require('twilio').jwt.ClientCapability;

    const identity = 'TwilioSampleIntegDemo'
    const capability = new ClientCapability({
        accountSid: context.ACCOUNT_SID,
        authToken: context.AUTH_TOKEN,
    });

    capability.addScope(new ClientCapability.IncomingClientScope(identity));
    capability.addScope(new ClientCapability.OutgoingClientScope({
        applicationSid: context.TWIML_APP_SID,
        clientName: identity,
    }));

    // Include identity and token in a JSON response
    response.setBody({
        'identity': identity,
        'token': capability.toJwt()
    });

    callback(null, response);
};