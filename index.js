/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const axios = require('axios');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
 async handle(handlerInput) {
    const speechText = 'Welcome to Mercedes App. Logging you in . Wait a while.';

    // res.redirect('http://localhost:3000/authorizationcode')
  //  await axios.get('http://localhost:3000/authorizationcode')
  //   .then( (res) => {
  //       console.log(res);
  //   })

//     var request = require('request');

// var headers = {
//     'accept': 'application/json',
//     'authorization': 'Bearer 37779ffe-2a05-4ccf-99f6-1f29ac76b18e'
// };

// var options = {
//     url: 'https://api.mercedes-benz.com/experimental/connectedvehicle/v1/vehicles/AA16EC3E0327DD083A/doors',
//     headers: headers
// };

// function callback(error, response, body) {
//     console.log(body)
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }
// }

// request(options, callback);

    
    // try {
    //   const { accessToken } = '59326fb0-649b-45b6-aee1-50a3ab2e6e11';
    //   const results = await request({
    //     uri: `https://api.mercedes-benz.com/experimental/connectedvehicle/v1/vehicles/AA16EC3E0327DD083A/doors`,
    //     method: 'GET',
    //     headers: {
    //       authorization: `Bearer ${accessToken}`,
    //       accept: application/json,
    //     },
    //   });
    //   return handlerInput.responseBuilder
    //     .speak(generateDoorStatusResponse(JSON.parse(results)))
    //     .getResponse();
    // } catch (err) {
    //   if (err.statusCode === 401) {
    //     return handleExpiredAccessToken(handlerInput, DoorStatusHandler);
    //   }
    //   throw err;
    // }


    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};


const CheckDoorsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CheckDoorsIntent';
  },
  handle(handlerInput) {

    const results = await request({
      uri: 'https://api.mercedes-benz.com/experimental/connectedvehicle/v1/vehicles/AA16EC3E0327DD083A/doors',
      method: 'GET',
      headers: {
        authorization: 'Bearer 37779ffe-2a05-4ccf-99f6-1f29ac76b18e',
        accept: "application/json",
      },
    });

    let json = JSON.parse(results);
    let speechText = 'These doors are open or unlocked'
    Object.keys(json).forEach(function(key) {
        console.log('Key : ' + key + ', Value : ' + json[key]);

        if(json[key] === 'OPEN' || json[key] == 'UNLOCKED')
        {
            speechText+= key.substring(14, key.length)
        }
    });



    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Check Doors', speechText)
      .getResponse();
  },
};


const LockCarIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LockCarIntent';
  },
  handle(handlerInput) {
      const TODO = handlerInput.requestEnvelope.request.intent.slots.TODO.value.toLowerCase();
      if(TODO.includes('unlock'))
      {
        TODO = "UNLOCK";
      }
      else
      {
        TODO = "LOCK"
      }
      
      const results = await request({
      uri: 'https://api.mercedes-benz.com/experimental/connectedvehicle/v1/vehicles/AA16EC3E0327DD083A/doors',
        method: 'POST',
        headers: {
          authorization: 'Bearer 37779ffe-2a05-4ccf-99f6-1f29ac76b18e',
          accept: "application/json",
        },
        body: JSON.stringify({
          command: TODO,
        }),
      });
      return handlerInput.responseBuilder
        .speak(`${TODO}ing your car.`)
        .getResponse();
  },
};


const LocationIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LocationIntent';
  },
  handle(handlerInput) {
    
    const results = await request({
      uri: 'https://api.mercedes-benz.com/experimental/connectedvehicle/v1/vehicles/AA16EC3E0327DD083A/location',
      method: 'GET',
      headers: {
        authorization: 'Bearer 37779ffe-2a05-4ccf-99f6-1f29ac76b18e',
        accept: "application/json",
      },
    });

    let json = JSON.parse(results);
    let speechText = 'The location of your car is :'
    Object.keys(json).forEach(function(key) {
        console.log('Key : ' + key + ', Value : ' + json[key]);

            speechText+= key;
            speechText+= json[key];
            
    });



    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Location', speechText)
      .getResponse();
  },
};


const FuelIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FuelIntent';
  },
  handle(handlerInput) {
    
    const results = await request({
      uri: 'https://api.mercedes-benz.com/experimental/connectedvehicle/v1/vehicles/AA16EC3E0327DD083A/fuel',
      method: 'GET',
      headers: {
        authorization: 'Bearer 37779ffe-2a05-4ccf-99f6-1f29ac76b18e',
        accept: "application/json",
      },
    });

    let json = JSON.parse(results);
    let speechText = 'The fuel level is '
    Object.keys(json).forEach(function(key) {
        console.log('Key : ' + key + ', Value : ' + json[key]);

            speechText+= json[key];
            
    });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};




const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    CheckDoorsIntentHandler,
    LockCarIntentHandler,
    LocationIntentHandler,
    FuelIntentHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
