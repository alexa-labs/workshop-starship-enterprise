// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const HELP = "Puedes decir: Analiza el status de la nave, ataca al enemigo, enciende hiper espacio, bitácora del capitán, activa defensa o regresar a casa"
const DEFAULT_REPROMPT = "¿Qué quieres hacer ahora?";
const GOODBYE = "Hasta la próxima. Comandante";

const VIDEO_URLS = {
  "AnalyzeShipStatus": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/rocket-horizontal.mp4",
  "Attack": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/attack.mp4",
  "BeamMeUp": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/nebula.mp4",
  "CaptainsLog": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/controls.mp4",
  "Defend": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/defend.mp4",
  "HyperDrive": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/warp.mp4",
  "ReturnHome": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/space.mp4"
};


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'

      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ReturnHomeIntent')

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'home');
  },
  handle(handlerInput) {
    const speechText = "<audio src='https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/sounds/launch_ES.mp3'></audio>";

    if (supportsAPL(handlerInput)) {
    handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['ReturnHome']
                }
              }
            }
        });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(HELP)
      .withSimpleCard('Comando Espacial', speechText)
      .getResponse();
  },
};

const AnalyzeShipStatusIntentHandler = {
 canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AnalyzeShipStatusIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'analyze');
  },
  handle(handlerInput) {
    const speechText = "Analizando el status de la nave. "
  + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_open_airlock_01'/> "
  + "La nave está en buenas condiciones. Sin daño. Nivel de Combustible lleno. "
  + "Sin causas actuales de alarma ";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['AnalyzeShipStatus']
                }
              }
            }
        });
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Comando Espacial', speechText)
      .getResponse();
  },
};

const AttackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AttackIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'attack');
  },
  handle(handlerInput) {
    const speechText = "Desplegando misíles. " +
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_incoming_explosion_01'/> "
     + "fase de ataque activada. "
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_explosion_2x_01'/>";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['Attack']
                }
              }
            }
        });
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Comando Espacial', speechText)
      .getResponse();
  },
};

const BeamMeUpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BeamMeUpIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'beam');
  },
  handle(handlerInput) {
    const speechText = "Preparando teletransportación "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_engines_on_large_01'/> "
      + "Atraer"
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_engines_on_short_burst_01'/>"
      + "Listo. ";
    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['BeamMeUp']
                }
              }
            }
        });
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Comando Espacial', speechText)
      .getResponse();
  },
};

const SetHyperDriveIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SetHyperDriveIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'warp');
  },
  handle(handlerInput) {
    const speechText = "Entrando al Hiper Espacio "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_long_explosion_1x_01'/>";
    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['HyperDrive']
                }
              }
            }
        });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Comando Espacial', speechText)
      .getResponse();
  },
};

const CaptainsLogIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CaptainsLogIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'checkLog');
  },
  handle(handlerInput) {
    const speechText = 
      "<speak>" +
    " Entrada más reciente en la bitácora del capitán." +
    " <break time='1s'/>" +
    " <audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>" +
      " <voice name='Enrique'>" +
      "     Día <say-as interpret-as='digits'>537</say-as> en la misión de exploración" +
      "     La tripulación está contenta y feliz de estar a bordo de la nave. " +
      "     Hoy vamos a intentar ingresar al Dominio, el cuadrante galáctico gamma." + 
      "     <amazon:effect name='whispered'>Espero que estemos a Salvo.</amazon:effect>" +
      "     Hasta pronto." +
      "     Cambio y fuera." +
      "     <audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>" +
      "   </voice>" +
    "</speak>";
    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['CaptainsLog']
                }
              }
            }
        });
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Comando Espacial', speechText)
      .getResponse();
  },
};

const DefendIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DefendIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'defend');
  }
,
  handle(handlerInput) {
    const speechText = "Activando escudos de defensa "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_sheilds_up_01'/>";

    if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['Defend']
                }
              }
            }
        });
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Comando Espacial', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      
      if (supportsAPL(handlerInput)) {
      handlerInput.responseBuilder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: require('./launch.json'),
            datasources: {
              "shipCommanderData": {
                "properties": {
                  "video": VIDEO_URLS['ReturnHome']
                }
              }
            }
        });
    }
      
    return handlerInput.responseBuilder
      .speak(HELP)
      .reprompt(HELP)
      .withSimpleCard('Comando Espacial', HELP)
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
      .withSimpleCard('Comando Espacial', GOODBYE)
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
    console.log(`Error: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Lo siento. No puedo entender lo que dices. Dilo de nuevo.')
      .reprompt('Lo siento. No puedo entender lo que dices. Dilo de nuevo.')
      .getResponse();
  },
};

function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface != null && aplInterface != undefined;
}

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
