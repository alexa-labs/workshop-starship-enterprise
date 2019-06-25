// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const HELP = "Puedes decir: Analiza el status de la nave, ataca al enemigo, enciende hiper espacio, bitácora del capitán, activa defensa o regresar a casa"
const DEFAULT_REPROMPT = "¿Qué quieres hacer ahora?";
const GOODBYE = "Hasta la próxima Comandante";


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'

      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ReturnHomeIntent');
  },
  handle(handlerInput) {
    const speechText = "Bienvenido a Comando Espacial, tu eres el capitán de nuestra exploración estelar, para comenzar puedes decir algo como: Analiza el status de la nave, o leer la bitácora del capitán, es tiempo de embarcarnos en una aventura por lo desconocido";
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
      && handlerInput.requestEnvelope.request.intent.name === 'AnalyzeShipStatusIntent';
  },
  handle(handlerInput) {
    const speechText = "Analizando el status de la nave. "
      + "La nave está en buenas condiciones. Sin daño. Nivel de Combustible lleno. "
      + "Sin causas actuales de alarma";

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
      && handlerInput.requestEnvelope.request.intent.name === 'AttackIntent';
  },
  handle(handlerInput) {
    const speechText = "Desplegando misíles, fase de ataque activada";

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
      && handlerInput.requestEnvelope.request.intent.name === 'BeamMeUpIntent';
  },
  handle(handlerInput) {
    const speechText = "Preparando teletransportación. Atraer. Listo.";

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
      && handlerInput.requestEnvelope.request.intent.name === 'SetHyperDriveIntent';
  },
  handle(handlerInput) {
    const speechText = "Entrando al Hiper Espacio";

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
      && handlerInput.requestEnvelope.request.intent.name === 'CaptainsLogIntent';
  },
  handle(handlerInput) {
    const speechText = "Entrada más reciente en la bitácora del capitán. "
      + "Día 537 en la misión de exploración. "
      + "La tripulación está contenta y feliz de estar a bordo de la nave. "
      + "Hoy vamos a intentar ingresar al Dominio, el cuadrante galáctico gamma. "
      + "Espero que estemos a Salvo. "
      + "Hasta pronto. "
      + "cambio y fuera. ";

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
      && handlerInput.requestEnvelope.request.intent.name === 'DefendIntent';
  },
  handle(handlerInput) {
    const speechText = "Activando escudos de defensa";

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
