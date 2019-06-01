# Add SSML, Sound Effects, and Amazon Polly

In this section of the workshop, you will incorporate [Speech Synthesis Markup Language](https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html), [Amazon Polly](https://aws.amazon.com/polly/) and the [Alexa Skills Kit Sound Library](https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html) into your skill. Integrating these together promotes a more immersive and imaginative VUI design. When launched, this Alexa skill will have the customer interact with the Ship Commander skill, incorporating sound effects and different characters.

## Objectives

After completing this workshop, you will be able to:

- Configure Intents, Sample Utterances, and Slots
- Update your skill code to incorporate SSML
- Utilize the Alexa Sound Effects Library
- Learn how to compile MP3 files and host them on S3
- Change Alexa's voice using Amazon Polly

## Prerequisites

This lab requires:

- Access to a notebook computer with Wi-Fi, running Microsoft Windows, Mac OSX, or Linux (Ubuntu, SuSE, or RedHat).
- An Internet browser such as Chrome, Firefox, or IE9 (previous versions of Internet Explorer are not supported).
- Having completed **[Step 0: Initialize Ship Commander]( )**

## Goal: Creating immersive experiences
When the service for your skill returns a response to a user's request, you provide text that the Alexa service converts to speech. Alexa automatically handles normal punctuation, such as pausing after a period, or speaking a sentence ending in a question mark as a question.

However, in some cases you may want additional control over how Alexa generates the speech from the text in your response. For example, you may want a longer pause within the speech, or you may want a string of digits read back as a standard telephone number. The Alexa Skills Kit provides this type of control with Speech Synthesis Markup Language (SSML) support.

Amazon Polly is a service that turns text into lifelike speech, allowing you to create applications that talk, and build entirely new categories of speech-enabled products. Amazon Polly is a Text-to-Speech service that uses advanced deep learning technologies to synthesize speech that sounds like a human voice. You can integrate Polly voices via SSML tags.


### Task 1.1: Configuring your SSML
In order to achieve our more immersive conversational experience, we need to incorporate more advanced SSML into our Alexa responses.

1. Navigate to the Amazon Developer Portal at [https://developer.amazon.com/alexa](https://developer.amazon.com/alexa).
2. Click **Sign In** in the upper right.
3. When signed in, click **Your Alexa Dashboards** in the upper right.
4. Choose your **Ship Commander** skill.
5. Click on **Code** tab in the top menu.
6. Navigate to the `CaptainsLogIntentHandler`.
7. **Copy** the the following `speechText`.

```
Most recent entry of the Captains log: Day 537 on the exploration mission. The crew is in good spirits and happy to be aboard the ship. Today we are going to attempt entry into the Dominion, the gamma galactic quadrant. I hope we will be safe. Until next time.
```
8. Click on the **Test** tab in the top menu.
9. Assure that "Skill Testing is enabled in: Development mode". 
10. Under that, click on the **Voice & Tone** tab.
11. Within the `speak` tags, **paste** the `speechText`.

```
<speak>
    Most recent entry of the Captains log: Day 537 on the exploration mission. The crew is in good spirits and happy to be aboard the ship. Today we are going to attempt entry into the Dominion, the gamma galactic quadrant. I hope we will be safe. Until next time.
</speak>
```
12. Hit the **Play** button to listen to the output.

This output is sufficient; however, we can make it more engaging by adding some simple SSML to the string.

13. Replace the ":" in the string with a `break` tag as shown in the following code sample:

```
Most recent entry of the Captains log 
<break time='1s'/>
```

14. Next, add a `say-as` tag to the number, to interpret it as "digits"

```
Day <say-as interpret-as='digits'>537</say-as>
```

15. Finally, add an `amazon:effect` tag with `whisper` to the string "I hope we will be safe".

```
<amazon:effect name='whispered'>I hope we will be safe.</amazon:effect>
```

16. Hit the **Play** button to listen to the output. These small changes make this output string sound more conversational.


### Task 1.2: Add Sound Effects
Sound effects can enhance your skill to create an engaging and delightful voice-first interaction. With voice, customers don’t have the barrier of what appears on-screen. Instead, they can use their own imagination and creativity to paint a picture based on how they are interacting with the skill through sound and voice.

Sound effects can be added to the speech output via an `audio` tag. The [Sound Kit Library](https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html) are Amazon-hosted audio clips you can use within your skill.

1. In a new tab, navigate to the [Sound Kit Library](https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html).
2. Scroll down to **SciFi Sounds**. You can now scroll down and see the list of sound effects in the SciFi category we can add inline to our SSML.
3. Find the **scifi alien voice (7)** clip and **copy** the SSML.
4. Navigate back to the **Developer Console** tab.
5. Paste the copied sound effect after the `break` tag in the string, and at the end of the string.

```
<speak>
    Most recent entry of the Captains log <break time='1s'/>
    <audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>
    Day <say-as interpret-as='digits'>537</say-as>
    on the exploration mission.
    The crew is in good spirits and happy to be aboard the ship.
    Today we are going to attempt entry into the Dominion, the gamma galactic quadrant.
    <amazon:effect name='whispered'>I hope we will be safe.</amazon:effect>
    Until next time.
    <audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>
</speak>
```

6. Hit the **Play** button to listen to the output. The sound effects are good indicators to the customer of the start and end of the log entry.

### Task 1.3: Change voices with Amazon Polly

With dozens of lifelike voices across a variety of languages, you can select the ideal voice and build speech-enabled applications that work in many different countries. In the case of our skill, we can utilize Amazon Polly voices to differentiate between characters with each speech output.

1. In a new tab, navigate to [Amazon Polly](https://aws.amazon.com/polly/).
2. Click on **Get Started with Amazon Polly**.
3. Sign in to the **AWS Console**. The account you use for AWS does not necessarily have to be the same as your Alexa Developer console credentials. If you don't have an AWS account, create an account.
4. You should be on the "Text-to-Speech" page once you are logged in.
5. Click on the **SSML** tab of the editing pane.
6. Click on the **Listen to speech** button to hear the currently selected voice (Joanna, Female).
7. Take the time to experiment with the Amazon Polly voices and pick one voice for the computer, and one voice for the captain's log.
8. Note the two voices that you have selected and navigate back to the **Alexa Developer Console** tab.
9. Surrounding the first sentence, insert `voice` tags with your first voice name.

```
<voice name='Amy'>Most recent entry of the Captains log</voice>
```

10. Surround the second half of the SSML with `voice` tags using your second voice.

```
<speak>
    <voice name='Amy'>Most recent entry of the Captains log</voice>
    <break time='1s'/>
    <audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>
    <voice name='Matthew'>Day <say-as interpret-as='digits'>537</say-as>
    on the exploration mission.
    The crew is in good spirits and happy to be aboard the ship.
    Today we are going to attempt entry into the Dominion, the gamma galactic quadrant.
    <amazon:effect name='whispered'>I hope we will be safe.</amazon:effect>
    Until next time.</voice>
    <audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>
</speak>
```

7. Hit the **Play** button to listen to the output. Now we have a voice output that utilizes SSML, Sound Effects, and Amazon Polly effectively.

### Task 1.4: Integrate new output speech into your skill

We'll now update your skill code to incorporate the output speech we just generated back into our intent.

1. Copy the entire SSML we just generated.
2. Navigate to the **Code** tab.
3. Scroll down to the `CaptainsLogIntentHandler`
4. Set the variable `speechText` as our SSML.

```
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
```

5. **Save** the code.

We also need to generate similar experiences for every response Alexa sends back to the customer to maintain consistency.

We have already created and hosted an audio file for you as [an introduction to this skill](https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/sounds/launch.mp3). This audio file was converted to an [Alexa-friendly audio format](https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html#audio) and made public so you can use it within your skills. You can also host and incorporate your own audio clips on [Amazon S3](https://aws.amazon.com/s3/).  

6. Navigate to the `LaunchRequestHandler`.
7. Update the `speechText` variable to incorporate the audio clip into your output speech.

```
const speechText = "<audio src='https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/sounds/launch.mp3'></audio>";
```

This audio clip will play whenever the customer invokes the skill, or says "return home". Now, let's update the rest of the custom intents with our sound effects and Amazon Polly voices. Be sure to use the original voice you indicated as the computer voice from the `CaptainsLogIntent`

8. Navigate to the `AnalyzeShipStatusIntentHandler`.
9. Update the `speechText` variable to incorporate the following SSML into your output speech.

```
    const speechText = "<voice name='Amy'>Analyzing the ship status "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_open_airlock_01'/>"
      + "Ship is under well condition. No damage, fuel levels are full. "
      + "No immediate cause for concern.</voice>";
```

10. Navigate to the `AttackIntentHandler`.
11. Update the `speechText` variable to incorporate the following SSML into your output speech.

```
    const speechText = "<voice name='Amy'>Deploy the rockets"
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_incoming_explosion_01'/>"
     + "Engage in initial attack</voice> "
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_explosion_2x_01'/>";
```

12. Navigate to the `BeamMeUpIntentHandler`.
13. Update the `speechText` variable to incorporate the following SSML into your output speech.

```
    const speechText = "<voice name='Amy'>Prepare to beam "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_engines_on_large_01'/> "
      + "Engage</voice> "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_engines_on_short_burst_01'/>";
```

14. Navigate to the `SetHyperDriveIntentHandler`.
15. Update the `speechText` variable to incorporate the following SSML into your output speech.

```
    const speechText = "<voice name='Amy'>Engaging hyper drive now</voice> "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_long_explosion_1x_01'/>";
```

16. Navigate to the `DefendIntentHandler`.
17. Update the `speechText` variable to incorporate the following SSML into your output speech.

```
    const speechText = "<voice name='Amy'>Engage defensive shields</voice> "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_sheilds_up_01'/>";
```

Finally, let's update the strings we use in our built-in intents to use our Amazon Polly voice.

18. **Scroll to the top** of the skill code until you can see the `HELP`, `DEFAULT_REPROMPT` and `GOODBYE` variables.
19. Add your Amazon Polly voice to each of these variables.

```
const HELP = "<voice name='Amy'>You can say either: analyze ship status, beam me up, "
    + "set hyper drive to warp speed, read the captains log, attack, defend or return "
    + "home.</voice>";
const DEFAULT_REPROMPT = "<voice name='Amy'>What would you like to do next?</voice>";
const GOODBYE = "<voice name='Amy'>Until next time commander.</voice>";
```

20. **Save** and **Deploy** your code.

### Task 1.5: Test your voice interaction


We'll now test your skill in the Developer Portal. Here you can test an entire customer interaction with the built-in Alexa simulator.

1. In the menu at top of the page, click **Test**.
3. In **Alexa Simulator** tab, under **Type or click…**, type "open ship commander"
4. You should hear and see Alexa respond with the message in your LaunchRequest. You can experiment with your interaction by saying next, "beam me up" or "read the captains log".

### Congratulations! You have finished Task 1!


## License

This library is licensed under the Amazon Software License.