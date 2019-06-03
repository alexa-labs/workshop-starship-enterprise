# Make Money with In-Skill Purchasing

In this section of the workshop, you will incorporate in-skill purchasing (ISP) into your skill. When developers and content creators build delightful skills with compelling content, customers win. With in-skill purchasing, you can sell premium content to enrich your Alexa skill experience.

When a customer walks through your Ship Commander, they have the option to purchase the ability to ask for a Space facts. When the customer successfully completes the in-skill purchase, they can ask for up a fact at any point in time.

## Objectives

After completing this workshop, you will be able to:

- Set up an ISP entitlement in the developer console
- Configure your interaction model to handle ISP
- Update your service code to be able to handle the various requests from the purchase flow

## Prerequisites

This lab requires:

- Access to a notebook computer with Wi-Fi, running Microsoft Windows, Mac OSX, or Linux (Ubuntu, SuSE, or RedHat).
- An Internet browser such as Chrome, Firefox, or IE9 (previous versions of Internet Explorer are not supported).
- Having completed **[Step 0: Initialize Ship Commander](../Step-0-Initialize-your-Ship-Commander)**
- Having completed **[Step 1: Add SSML, Sound Effects, and Amazon Polly](../Step-1-Add-SSML-Sound-Effects-and-Amazon-Polly )**
- Having completed **[Step 2: Build your Display](../Step-2-Build-your-Display)**
- Having completed **[Step 3: Pairing your VUI and GUI](../Step-3-Pairing-your-VUI-and-GUI)**

## Goal: Integrating Premium Features into your skill
ISP supports one-time purchases for entitlements that unlock access to features or content in your skill, subscriptions that offer access to premium features or content for a period of time, and consumables which can be purchased, depleted and purchased again.

You can define your premium offering and price, and we handle the voice-first purchasing flow. We also provide self-service tools to manage your in-skill products, and optimize their sales performance over time. Today, you can make money through both ISP and Alexa Developer Rewards. This feature is available for Alexa skills in the US.

### Task 4.1: Build the Premium Feature into your skill
Before we start to integrate a formal ISP flow into our skill, we need to build the premium feature into the skill. This will mean creating an intent for when the customer asks for a fact in the game.

1. Be sure your most recent code is **saved and deployed**.
2. In the Amazon Developer Portal, navigate to your **Build** tab.
3. In the left-hand menu, click the **+ Add** icon to add an intent
4. Create a custom intent called "FactIntent"
5. Enter the following sample utterances for FactIntent:

```
i want to hear a space fact,
i want to hear a fact,
give me a space fact,
random fact,
fact,
i want to hear a random fact,
tell me about space,
give me a random fact,
give me a fact
```

6. **Save** and **Build** your interaction model.

This has updated our interaction model to be able to understand when the user requests for a fact. Now we need to be able to handle this in our service code. Once this is done, we will put this ability behind an ISP flow.

7. Navigate to your service code in the **Code** tab of the developer console.
8. **Click** on the _Create File_ icon on the upper left.
9. Under **File Path:**, type _lambda/facts.js_
10. **Paste** the following code into this file:

```
'use strict';

module.exports = {
	FACTS: [
		'A year on Mercury is just 88 days long.',
		'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
		'On Mars, the Sun appears about half the size as it does on Earth.',
		'Jupiter has the shortest day of all the planets.',
		'The Sun is an almost perfect sphere.',
	]
};

```

These are the list of facts that Alexa will read from when the customer asks for a fact.

11. **Save** and **Deploy** your code.
12. Navigate to your `index.js`.
13. At the top of the file, add `const FACTS = require("./facts");`
14. Add the helper function to get a random number:

```
function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}
```

15. Next, **add a handler** for the `FactIntent` to read off a random fact from this file:

```
const FactIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FactIntent';
  },
  handle(handlerInput) {
    let randomFact = FACTS.FACTS[getRandom.call(this, 0, FACTS.FACTS.length-1)];
    let speechText = "<voice name='Amy'>Here is your random fact: "
      + randomFact
      + "</voice> ";

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
      .reprompt(DEFAULT_REPROMPT)
      .withSimpleCard('Ship Commander', speechText)
      .getResponse();
  }
};
```

16. Finally, add `FactIntentHandler` to your **RequestHandler** builder.
17. **Save and deploy** your code.

### Task 4.2: Test that the Premium Feature works in your skill
At this point we should test that facts work within your Ship Commander skill. You can test your skill in the Developer Portal or in Lambda using the JSON Input from the testing console.

1. Navigate to the **Test** tab of the Developer Portal.
2. In **Alexa Simulator** tab, under **Type or click…**, type "open ship commander"
3. You should hear and see Alexa respond with the message in your LaunchRequest. Now type "i want a random fact".
4. Assure you get an appropriate response of a random fact and the correct display.

### Task 4.3: Add In-Skill Purchasing into your interaction model
Now we are going to add In-Skill purchasing into our skill. This will allow a customer to pay for a premium feature within your skill. You can integrate ISP into your skill through the Developer Portal or via the ASK-CLI.

1. Navigate to the **Build** tab of the Developer Portal.
2. Scroll down on the left-menu and select **IN-SKILL PRODUCTS**
3. You are now in the ISP management portal. Click the blue **Create In-Skill Product** button.
4. Type `fact_pack` in **Reference Name** field.
5. Assure that **One-Time Purchase** is selected as the product type.
6. Click the blue **Create In-Skill Product** button.
7. Under **Supported Languages** section, click on "+ Add new language" and select "English (US)"
7. Fill all the metadata fields for `fact_pack` as follows:
	- **Display Name:** Fact Pack
	- **One Sentence Description:** Fact pack for the Ship Commander skill
	- **Detailed Description:** Unlock the fact pack to hear a random fact about Space.
	- **Example Phrases:** Tell me a fact, Give me a random fact
	- **Icons:** Use the [Alexa Icon Builder](https://developer.amazon.com/docs/tools/icon-builder.html) to make the icons for your product, and upload each size appropriately
	- **Keywords:** fact, facts, random
	- **Purchase Prompt Description:** The fact pack includes multiple facts from the Premium Space Facts Selection.
	- **Purchase confirmation description:** Purchase the fact pack?
	- **Privacy policy URL:** [https://privacy.com](https://privacy.com)
8. Click the **Save and Continue** button.
9. **Select a price** for your product (default is $0.99).
10. Assure the **Release Date** set to today.
11. Set the **Tax Category** for your product to "Information Services".
12. Click the **Save and Continue** button.
13. For **Testing Instructions**, insert your example phrases: Tell me a fact, Give me a fact.
14. Click the **Save and Finish** button.
15. You will see a prompt - “Link fact_pack to your skill?” - Click on **Link to skill**.

### Task 4.4: Add ISP into your service
Now that we can recognize ISP requests and responses within our skill, we need to handle it within our skill.

1. Firstly, we need two helper functions to let us know how to define an Entitlement within our skill. **Add** the following helper functions to `index.js` in the **Code** tab of the developer console:

```
function isProduct(product) {
  return product && product.length > 0;
}

function isEntitled(product) {
  return isProduct(product) && product[0].entitled == 'ENTITLED';
}
```

2. **Navigate** to our `FactIntentHandler` in `index.js`.
3. At the top of the `handle` function, **insert the following lines of code:**

```
handle(handlerInput) {
  const locale = handlerInput.requestEnvelope.request.locale;
  const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
```
The first line grabs the customer's local, and the second begins the monetization flow.

4. Wrap the logic we wrote in Task 4.1 in the following return statement:

```
  return ms.getInSkillProducts(locale).then(function(res) {
		// Task 4.1 logic here
  });
```
This statement will return an appropriate response depending on whether the customer has already made a purchase or not.

5. Now we need to determine what product a customer could purchase at this point in the skill, and if they have purchased it. **Insert the following code:**

```
  return ms.getInSkillProducts(locale).then(function(res) {
    var product = res.inSkillProducts.filter(record => record.referenceName == 'fact_pack');
    
    if (isEntitled(product)) {
      // Task 4.1 logic here
    } else {
      
    }
```
The customer will be pushed into the `else` statement if they have not purchased `fact_pack`. It will enter the ISP flow and ask if the user would like to complete a purchase.

6. **Insert the following code** into the `else` statement:

```
  const upsellMessage = "You don't currently own the fact pack. Want to learn more about it?";
  
  return handlerInput.responseBuilder
    .addDirective({
      'type': 'Connections.SendRequest',
      'name': 'Upsell',
      'payload': {
        'InSkillProduct': {
          'productId': product[0].productId
        },
        'upsellMessage': upsellMessage
      },
      'token': 'correlationToken'
    })
    .getResponse();
```

7. **Save and deploy** your code.

In this case, we are sending a directive with the name `Upsell`. This is indicating we are entering the ISP flow with the directive to tell the customer more information about the product before they purchase. We also need to create a similar intent for when the customer requests to buy something directly.

8. **Create a custom intent** named `BuyIntent` for your interaction model in the **Build** tab of Developer Portal with the following utterances

```
buy
buy facts
i want to buy facts
buy ship commander facts
buy me facts
purchase facts
purchase random facts
buy random facts
```

9. **Save and build** your interaction model.
10. In `index.js` in the **Code** tab, **create a handler** for `BuyIntent` that can send a directive of type `Connections.SendRequest` with the name `Buy` to buy the `fact_pack` directly:

```
const BuyIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
       handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
  },
  handle(handlerInput) {  
    // Inform the user about what products are available for purchase
    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function(res) {
      let product = res.inSkillProducts.filter(record => record.referenceName == "fact_pack");

      return handlerInput.responseBuilder
        .addDirective({
          'type': 'Connections.SendRequest',
          'name': 'Buy',
          'payload': {
            'InSkillProduct': {
              'productId': product[0].productId
            }
          },
          'token': 'correlationToken'
        })
        .getResponse();
    });
  }
};
```
Once either the `Buy` or `Upsell` directive is sent, the customer has the option to ask for more information, or step out of the purchasing flow. We need to incorporate handlers for these steps.

11. **Create** a `BuyAndUpsellResponseHandler` that matches the following:

```
const BuyAndUpsellResponseHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
      (handlerInput.requestEnvelope.request.name === 'Buy' ||
        handlerInput.requestEnvelope.request.name === 'Upsell');
  },
  handle(handlerInput) {
    console.log('IN: BuyResponseHandler.handle');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function handlePurchaseResponse(res) {
      let product = res.inSkillProducts.filter(record => record.referenceName == 'fact_pack');

      if (handlerInput.requestEnvelope.request.status.code === '200') {
        let speechOutput = "";

        switch (handlerInput.requestEnvelope.request.payload.purchaseResult) {
          case 'ACCEPTED':
              speechOutput = "You have just purchased the ability to ask for facts. ";
              break;
          case 'DECLINED':
              speechOutput = "You can purchase facts at anytime during the game. "
              break;
          case 'ALREADY_PURCHASED':
              speechOutput = "You have just purchased the ability to ask for facts. ";
              break;
          default:
              speechOutput = "Something unexpected happened, but thanks for your interest in the fact pack. ";
              break;
        }

        return handlerInput.responseBuilder
          .speak(speechOutput + DEFAULT_REPROMPT)
          .reprompt(DEFAULT_REPROMPT)
          .getResponse();
      }

      // Something failed.
      console.log(`Connections.Response indicated failure. error: ${handlerInput.requestEnvelope.request.status.message}`);

      return handlerInput.responseBuilder
        .speak('There was an error handling your purchase request. Please try again or contact us for help.')
        .getResponse();
    });
  },
};
```

Notice how the returned response is just a normal speech response, indicating we are leaving the ISP flow.

We have now finished our intent handers for the ISP flow within our skill. We need to add these intents to our skill request handler.

12. **Add** `BuyIntentHandler` and `BuyAndUpsellResponseHandler` to your **RequestHandler** builder.
13. **Save and deploy** your code. 

### Task 4.5: Test that the ISP works in your skill

We will now test our skill again to assure that the ISP flow works and that our facts are accessible ONLY after a purchase flow is successful.

1. Navigate to the **Test** tab of the Developer Portal.
2. In **Alexa Simulator** tab, under **Type or click…**, type "open ship commander"
3. You should hear and see Alexa respond with the message in your LaunchRequest. Now type "i want a fact".
4. **Assure that she asks you if you want to purchase facts.**
5. She should respond with "You don't currently own the fact pack. Want to learn more about it?". Type "yes".
6. She should now read your **entitlement description**. Respond "yes" to buy it.
7. Now that you have purchased a fact pack, we can start a new game with facts! Say "i want a fact" and assure you get a random fact with an appropriate display.


### Congratulations! You have finished Task 4!


## License

This library is licensed under the Amazon Software License.
