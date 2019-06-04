# Initialize Ship Commander

In this section of the workshop, you will create and configure a skill using the Alexa Skills Kit SDK in NodeJS and Alexa Hosted Skills. When launched, this Alexa skill will have the customer interact with a Ship Commander skill that features a simple voice interaction.

## Objectives

After completing this workshop, you will be able to:

- Create an Amazon Developer account.
- Create and configure a new skill using the Alexa Skills Kit and Alexa Hosted Skills
- Create and configure Intents and sample Utterances
- Test a skill using the Alexa Testing Simulator and an Echo device.

## Prerequisites

This lab requires:

- Access to a notebook computer with Wi-Fi, running Microsoft Windows, Mac OSX, or Linux (Ubuntu, SuSE, or RedHat).
- An Internet browser such as Chrome, Firefox, or IE9 (previous versions of Internet Explorer are not supported).

## Goal: Completing a voice-only Ship Commander skill.
Alexa is the voice service that powers Amazon Echo. Alexa provides capabilities, called skills, which enable customers to interact with devices using voice (answer questions, play music, and more).

The Alexa Skills Kit (ASK) is a collection of self-service APIs, tools, documentation, and code samples that make it easy for you to develop your own Alexa skills, which you can then publish. ASK supports simple command-oriented skills, such as "Alexa, ask Greeter to say hello world" as well as sophisticated multi-command dialogs and parameter passing, such as "Alexa, what is this weekend's weather forecast?" The Alexa Skills Kit is a low-friction way to learn to build for voice.

This task will walk you through creating a simple skill that allows the customer to explore various parts of a space ship. Through this you will use the Alexa skills kit to learn the fundamentals of building a voice user experience.

### Task 0.1: Create an Account on developer.amazon.com (or Sign In)

1. Navigate to the Amazon Developer Portal at [https://developer.amazon.com/alexa](https://developer.amazon.com/alexa).
2. Click **Sign In** in the upper right to create a free account.

### Task 0.2: Create the Ship Commander Skill

1. When signed in, click **Your Alexa Dashboards** in the upper right.
2. Choose **Get Started** under Alexa Skills Kit. Alexa Skills Kit will enable you to add new skills to Alexa. (The other option, Alexa Voice Services, is what you use if you want to put Alexa onto other devices such as a Raspberry Pi.)
3. To start the process of creating a skill, click the **Create Skill** button on the right.

### Task 0.3: Skill Information

1. Skill Name: Enter **Ship Commander**.
2. Language: Select **English (US)**.
3. Skill Type: Select **Custom Interaction Model**.
4. Under, _choose a method to host your skill's backend resources_, select **Alexa-Hosted**. This will allow you to host your skill code within this Alexa Developer console. If you wish to host your code on AWS Lambda, or behind an HTTPS endpoint, you could select 'Provision your own'. However, for this workshop, we will be working strictly in the developer console.
5. Scroll up and click the blue **Create Skill** button on the upper right.

### Task 0.4: Interaction Model

1. In the navigation menu on the left, click **Invocation**
2. Your invocation name should be default set to: **ship commander**. This will be the name that you will use to start your skill (eg., "Alexa, Open _[hello world]_") The invocation name you choose needs to be more than one word and not contain a brand name. Remember the invocation name for future use in this lab.
3. In the navigation menu on the left, choose **JSON Editor**.
4. **Copy** the JSON with the [en-US language model](./en-US.json) of the Ship Commander workshop. 
5. **Replace** ALL the current content of the JSON editor with the content that you copied on Step 4.  

Each of these JSON fields are **Intents**. Intents represent what your skill can do, they are an action Alexa will take. To prompt Alexa for the action, a user would say an **Utterance**. In the case of the **CancelIntent** , an example **utterance** a user would say to perform the cancel action would be "cancel ship commander".

This skill has seven customer intents: `AnalyzeShipStatusIntent`, `AttackIntent`, `BeamMeUpIntent`, `SetHyperDriveIntent`, `CaptainsLogIntent`, `DefendIntent`, and `ReturnHomeIntent`. Each intent has various utterances acting as training data for Alexa to understand the context of the action. Alexa responds in a different way for each intent. 

Optionally, you could incorporate **Slots** into your utterances. **Slots** are items that are variable to what the user says. To read more about slots, you can visit the [Slot Type Reference](https://developer.amazon.com/docs/custom-skills/slot-type-reference.html). For sake of this workshop, we will continue with our simple utterances.

5. Click the **Save Model** button. This will start the process of creating your interaction (If you did not make changes in the Code Editor the **Save Model** button is gray).
6. You may have noticed that in the JSON, every intent has sample utterances except for the `BeamMeUpIntent`. **Click** on the `BeamMeUpIntent` on the left menu.
7. You are now in a UI where you can incorporate more sample utterances for your custom intent. **Add** each of the following utterances individually:

```
beam
beam me up
beam me up scotty
beam us up
beam me into the nebula
beam us to nebula
```
Each of these utterances shows a varying combination of what a customer could say to initiate the response, on top of the utterances we already have trained in our skill. 

Remember these sample utterances are _training data_ for Alexa to be able to understand the context of your skill. **Optionally** you may add more sample utterances to this and the other intents.

8. Click on **Build Model**

We're now done with the Interaction Model.


### Task 0.5: Code Configuration

Your skill needs to be connected to an endpoint that will perform your skill logic. In our case, we chose **Alexa Hosted**, so we can edit our code in the Alexa Developer console.

1. Select the **Code** tab in the top menu.

You will now see the code that performs actions for Alexa to respond to the customer's request. We used the "Hello World" NodeJS template, and need to update the functions to match our skill's interaction model. 

2. **Copy** the code from [`index.js`](./index.js).
3. **Replace** the existing content of the code editor by pasting the code you copied

There are 11 handlers in this code. The first is the `LaunchRequestHandler` this is invoked when a customer opens the skill ("open ship commander") or when the customer invokes the `ReturnHome` intent. The next 6 are associated to the custom intents we built in the last section. Finally, the remaining 4 are to handle the built-in required intents for our skill and error handling.

Each handler has a `canHandle` and `handle`. The `canHandle` specifies the entrance criteria for executing the logic in `handle`.

3. Click the **Save** button to save your code.
4. Click the **Deploy** button to deploy your code to the development version of the skill.

After the Save and Deploy is complete, you have attached your skill code to your interaction model.

### Task 0.6: Test your voice interaction

We'll now test your skill in the Developer Portal. Here you can test an entire customer interaction with the built-in Alexa simulator.

1. In the menu at top of the page, click **Test**.
2. Switch **Test is disabled for this skill** to Development.
3. In **Alexa Simulator** tab, under **Type or click…**, type "open ship commander"
4. You should hear and see Alexa respond with the message in your LaunchRequest. You can experiment with your interaction by saying next, "beam me up" or "read the captains log".

**Optional**: Feel free to change Alexa's speech output in the Code tab and test to see the direct output!


### Congratulations! You have finished Task 0!

Continue the workshop with [**Step 1 - Add SSML, Sound Effects, and Amazon Polly**](../Step-1-Add-SSML-Sound-Effects-and-Amazon-Polly/)

Return to the [Workshop Main Page](..)

