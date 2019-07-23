# Pairing your VUI and GUI

Combining voice and visual experiences can make Alexa skills even more delightful, engaging, and simple for customers. When you build a multimodal experience, you combine voice, touch, text, images, graphics, audio, and video in a single user interface. The result is voice-first experience complemented by visuals. The experience should remain conversational and voice forward, rather than a series of menus or a voice-controlled commands. It should also lead with voice, making use of graphics and touch for richer interactions.

## Objectives

After completing this workshop, you will be able to:

- Merge your APL documents into your skill code
- Make your displays dynamic via your voice datasource
- Handle display user events in your voice service

## Prerequisites

This lab requires:

- Access to a notebook computer with Wi-Fi, running Microsoft Windows, Mac OSX, or Linux (Ubuntu, SuSE, or RedHat).
- An Internet browser suchas Chrome, Firefox, or IE9 (previous versions of Internet Explorer are not supported).
- Having completed **[Step 0: Initialize Ship Commander](../Step-0-Initialize-your-Ship-Commander)**
- Having completed **[Step 1: Add SSML, Sound Effects, and Amazon Polly](../Step-1-Add-SSML-Sound-Effects-and-Amazon-Polly )**
- Having completed **[Step 2: Build your Display](../Step-2-Build-your-Display )**

## Goal: Create a visual experience to be paired with your voice user interface 
Building voice user interfaces with APL borrows concepts you find in traditional web development, specifically with regards to styling, component nesting, and document hierarchy, but it also maintains security, scalability, and renderability across all Alexa-enabled devices.

You will take the display you created in the previous workshop, update it to be dynamic according to the requested intent, and send it in a directive with your speech response.

### Task 3.0: Check for supported interfaces 
We have finished authoring our display screen for our skill, we now need to add this APL code to our skill. The first thing we need to do, however, is determine if the device can support APL.

1. Assure you are in the **Code** tab in the Developer Portal. 
2. Navigate to your **`index.js`**
3. Scroll to the bottom of the document, and add the following helper function:

```
function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface != null && aplInterface != undefined;
}
```
This helper function determines if the following handlerInput can support a response that contains APL. We will call this helper function whenever we want to send an APL document in our response.

### Task 3.1: Add the APL document to your skill

We will now add an APL directive to the LaunchRequest response. A directive specifies how a compiler (or other translator) should process its input. In this case, our directive type will be `Alexa.Presentation.APL.RenderDocument`, indicating to interpret the input as a document to render as APL, and our input will be our `launch.json` document.

1. Scroll up to the `LaunchRequest`
2. **Add** an if statement to determine if the customer's device has a display using the **supportsAPL** function.

```
if (supportsAPL(handlerInput)) {

}
```
3. In the if statement, **paste** the following code to add the APL directive:

```
if (supportsAPL(handlerInput)) {
    handlerInput.responseBuilder
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./launch.json')
      });
}
```
4. We have added the APL document to the skill and are sending it alongside the response. **Save** and **Deploy** your code.


### Task 3.2: Send a datasource alongside your APL document
We have sent a display that makes sense for the `LaunchRequest` and `ReturnHomeIntent`, however if we want a more engaging experience, we should consider how we want the display to change depending on the user request.

In our implementation, it would make sense to update the background video for each action. That said, depending on what the user says, we would want to update the URL of the video in the Video component.

We can accomplish this through [_data-binding_](https://developer.amazon.com/docs/alexa-presentation-language/apl-data-binding-evaluation.html) from the [_datasource_](https://developer.amazon.com/docs/alexa-presentation-language/apl-document.html#maintemplate). 

The parameters defined in the `mainTemplate` of our APL document will be bound to the datasources provided in the directive that inflated the document.

1. **Navigate** to your `launch.json`.
2. **Scroll** to the `Video` component.
3. Update the `source` of the `Video` component to be:

```
"source": "${payload.shipCommanderData.properties.video}",
```

The `datasource` property is a JSON object that can contain any type of information to be inflated on your APL document. This information is accessible in the `mainTemplate` of your APL document in the `payload` variable in `parameters` via databinding. 

4. **Save** your code.

Now we need to send a matching datasource containing our video URL alongside the APL document so the video is variable to the request.

5. Open `index.js`
6. At the top of the code, after the `GOODBYE` const, **copy and paste** the following JSON object that contains URLs for the videos to be inflated per request:

```
const VIDEO_URLS = {
  "AnalyzeShipStatus": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/rocket-horizontal.mp4",
  "Attack": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/attack.mp4",
  "BeamMeUp": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/nebula.mp4",
  "CaptainsLog": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/controls.mp4",
  "Defend": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/defend.mp4",
  "HyperDrive": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/warp.mp4",
  "ReturnHome": "https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/videos/space.mp4"
};
```

7. Find the `LaunchRequest`
8. **Update** the APL directive to incorporate the datasource:

```
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

```
9. **Save** your code.

### Task 3.3: Handle the UserEvents from the TouchWrappers

Now we need to be able to accept and interpret the `UserEvent` sent when a customer taps on the `TouchWrapper`.

When a customer taps on any of the buttons, the skill should send them to the respective intent.

1. Scroll to the `canHandle` of the `LaunchRequest`.

This function should be called when a customer says _"open ship commander"_, _"return home"_, or touches the _"return home"_ button on the display. Right now we are handling the former two instances. We need to insert the logic in the `canHandle` to incorporate a UserEvent from the APL document.

Each button in the APL document has an `arguments` property. This is the variable sent alongside the UserEvent to differentiate between the button presses.

2. In the `canHandle`, insert a condition to accept an `Alexa.Presentation.APL.UserEvent`:

```
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'

      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ReturnHomeIntent')

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'home');
  },
```

First we are checking if the incoming request is of type `UserEvent`, if the `arguments` are not empty, and if the `arguments[0]` matches that of the "Return Home" button press, which would be the variable `home`. 

Our skill is now able to interpret and handle TouchWrapper events appropriately for the 	`LaunchRequest` and `ReturnHomeIntent`.

3. **Save** your code.

### Task 3.4: Update every intent to incorporate APL and handle UserEvents
We have successfully added logic to send dynamic skill information to our APL document from our skill. Now we need to apply this logic to every custom intent.

1. Scroll to the `AnalyzeShipStatusIntentHandler`
2. In the `canHandle`, **copy and paste** the following code:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AnalyzeShipStatusIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'analyze');
  }
```

3. In the `handle`, **copy and paste** the following code:

```
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
```

4. Scroll to the `AttackIntentHandler`
5. In the `canHandle`, **copy and paste** the following code:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AttackIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'attack');
  }
```

6. In the `handle`, **copy and paste** the following code:

```
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
```

7. Scroll to the `BeamMeUpIntentHandler`
8. In the `canHandle`, **copy and paste** the following code:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BeamMeUpIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'beam');
  }
```

9. In the `handle`, **copy and paste** the following code:

```
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
```

10. Scroll to the `SetHyperDriveIntentHandler`
11. In the `canHandle`, **copy and paste** the following code:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SetHyperDriveIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'warp');
  }
```

12. In the `handle`, **copy and paste** the following code:

```
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
```

13. Scroll to the `CaptainsLogIntentHandler`
14. In the `canHandle`, **copy and paste** the following code:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CaptainsLogIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'checkLog');
  }
```

15. In the `handle`, **copy and paste** the following code:

```
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
```

16. Scroll to the `DefendIntentHandler`
17. In the `canHandle`, **copy and paste** the following code:

```
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DefendIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'defend');
  }

```

18. In the `handle`, **copy and paste** the following code:

```
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
```

19. Scroll to the `HelpIntentHandler`
20. In the `handle`, **copy and paste** the following code:

```
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
```

21. **Save** and **Deploy** your code.

Now we have added all of our APL documents into our skill code. Each of these documents have data that is contingent on the current action taken.

### Task 3.5: Test that the display and touch events work in your skill
We will now test our skill to assure that the APL documents appear in the skill and that the `TouchWrappers` send the proper events to your skill.

1. Navigate to the **Test** tab of the Developer Portal.
2. Assure that **Device Display** is checked.
3. In **Alexa Simulator** tab, under **Type or click…**, type "open ship commander"
3. Scroll down to see that your APL display is showing on a "Medium Hub"
4. **Click** on one of the buttons. Assure that the _User Touch Event_ is sent to Alexa and that the game continues with the correct video being displayed.
5. Walk through each of the touch inputs to assure all of them are functional with the correct video displaying for each.


### Congratulations! You have finished Task 3!

Continue the workshop with [**Step 4 - Make Money with In-Skill Purchasing**](../Step-4-Make-Money-with-In-Skill-Purchasing/)

Return to the [Workshop Main Page](../README.md)
