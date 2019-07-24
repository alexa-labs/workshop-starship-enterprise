// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const HELP = "<voice name='Amy'>You can say either: analyze ship status, beam me up, "
    + "set hyper drive to warp speed, read the captains log, attack, defend or return "
    + "home.</voice>";
const DEFAULT_REPROMPT = "<voice name='Amy'>What would you like to do next?</voice>";
const GOODBYE = "<voice name='Amy'>Until next time commander.</voice>";


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'

      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ReturnHomeIntent');
  },
  handle(handlerInput) {
    const speechText = "<audio src='https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/sounds/launch.mp3'></audio>";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(HELP)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  },
};

const AnalyzeShipStatusIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AnalyzeShipStatusIntent';
  },
  handle(handlerInput) {
    const speechText = "<voice name='Amy'>Analyzing the ship status "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_open_airlock_01'/>"
      + "Ship is under well condition. No damage, fuel levels are full. "
      + "No immediate cause for concern.</voice>";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  },
};

const AttackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AttackIntent';
  },
  handle(handlerInput) {
    const speechText = "<voice name='Amy'>Deploy the rockets"
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_incoming_explosion_01'/>"
     + "Engage in initial attack</voice> "
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_explosion_2x_01'/>";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  },
};

const BeamMeUpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BeamMeUpIntent';
  },
  handle(handlerInput) {
    const speechText = "Initializing transport process. Transporting... <audio src="soundbank://soundlibrary/alarms/buzzers/buzzers_06"/> Wait... I forgot to beam up your clothes... One second, Captain... <audio src="soundbank://soundlibrary/alarms/beeps_and_bloops/boing_02"/> Beam process successful!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  },
};

const SetHyperDriveIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SetHyperDriveIntent';
  },
  handle(handlerInput) {
    const speechText = "<voice name='Amy'>Engaging hyper drive now</voice> "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_long_explosion_1x_01'/>";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  },
};

const CaptainsLogIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CaptainsLogIntent';
  },
  handle(handlerInput) {
    const speechText = "<speak>"
        + "<voice name='Amy'>Most recent entry of the Captains log</voice>"
        + "<break time='1s'/>"
        + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>"
        + "<voice name='Matthew'>Day <say-as interpret-as='digits'>537</say-as>"
        + "on the exploration mission. The crew is in good spirits and happy to be aboard the ship. "
        + "Today we are going to attempt entry into the Dominion, the gamma galactic quadrant. "
        + "<amazon:effect name='whispered'>I hope we will be safe.</amazon:effect>"
        + "Until next time.</voice>"
        + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>"
    +"</speak>";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  },
};

const DefendIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DefendIntent';
  },
  handle(handlerInput) {
    const speechText = "<voice name='Amy'>Engage defensive shields</voice> "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_sheilds_up_01'/>";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP)
      .reprompt(HELP)
      .withSimpleCard('Ship Commander', HELP)
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
    return handlerInput.responseBuilder
      .speak(GOODBYE)
      .withSimpleCard('Ship Commander', GOODBYE)
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
    AnalyzeShipStatusIntentHandler,
    AttackIntentHandler,
    BeamMeUpIntentHandler,
    SetHyperDriveIntentHandler,
    CaptainsLogIntentHandler,
    DefendIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
