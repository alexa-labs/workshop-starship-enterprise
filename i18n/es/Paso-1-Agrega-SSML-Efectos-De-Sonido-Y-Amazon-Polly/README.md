# Agregar SSML, Efectos de Sonido y Voces de Amazon Polly


En esta sección del taller, agregarás a tu skill nuevos sonidos y voces mediante: [Speech Synthesis Markup Language] (https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html), [Amazon Polly] (https://aws.amazon.com/polly/) y la [biblioteca de sonidos de ASK] (https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html). La integración de estos elementos promueve un diseño VUI (Voice User Interface) más envolvente e imaginativo. 

## Objetivos

Después de completar este paso, serás capaz de: 

- Configurar intents, Utterances de ejemplo y Slots.
- Actualizar tu skill para incorporar SSML.
- Utilizar la librería de efectos especiales de Alexa.
- Aprender como agregar archivos MP3 a las respuestas de tu skill
- Cambiar la voz de Alexa usando el servicio de Amazon Polly.


## Requisitos Previos 

Este Lab requiere:

- Acceso a un equipo de computo con acceso a Wi-Fi, ejecutando Microsoft Windows, Mac OS X, o Linux (Ubuntu, SuSE, or RedHat).
- Un navegador de Internet como Chrome, Firefox o IE9 (Versiones anteriores no están soportadas)
- Haber completado el [Paso 0 - Inicializa el Comando Espacial de tu nave] (./Paso-0-Inicializa-Comando-Espacial/)



## Objetivo: Crear una experiencia de inmersión

Cuando el servicio de tu skill devuelve una respuesta al usuario, tu proporcionas un texto que el servicio de Alexa convierte a voz. Alexa maneja automáticamente la puntuación normal, como hacer una pausa después de un punto o pronunciar en tono de preguntas aquellas oraciones que están dentro de signos de interrogación.

Sin embargo, en algunos casos es posible que necesites un control adicional sobre cómo Alexa genera el audio a partir del texto en la respuesta. Por ejemplo, es posible que quieras una pausa más prolongada dentro del discurso, o que necesites que se lean una serie de dígitos como un número de teléfono estándar. El ASK (Alexa Skills Kit) proporciona este tipo de control con el soporte de un lenguaje especializado para la synthesis de (SSML).

Amazon Polly es un servicio que convierte el texto en voz, te permite crear aplicaciones que hablan y generar nuevas experiencias de voz. Amazon Polly es un servicio de TTS (Text to Speech) texto a voz que usa tecnologías avanzadas de aprendizaje profundo para sintetizar el habla que suena como una voz humana. Puede integrar las voces de Polly a través de etiquetas SSML.


### Actividad 1.1: Configurando SSML

Para lograr una experiencia conversacional más inmersiva, necesitamos incorporar SSML más avanzados en nuestras respuestas de Alexa.

1. Navega al Portal de desarrolladores de Amazon en [https://developer.amazon.com/alexa](https://developer.amazon.com/alexa).
2. Haz clic en **Iniciar sesión** en la parte superior derecha.
3. Cuando hayas iniciado sesión, haz clic en **Your Alexa Dashboards** en la parte superior derecha.
4. Elige tu habilidad **Comando Espacial**
5. Haz clic en la pestaña **Code** en el menú superior.
6. Navegue hasta el intent llamado `CaptainsLogIntentHandler`.
7. **Copie** el siguiente `speechText`.

```
Entrada más reciente en la bitácora del capitán. 
día 537 en la misión de exploración. 
La tripulación está contenta y feliz de estar a bordo de la nave. 
Hoy vamos a intentar ingresar al Dominio, el cuadrante galáctico gamma. Espero que estemos a salvo. 
Hasta pronto.
Cambio y fuera.
```

8. En la parte superior, haz click en el tab **Test**.
9. Asegúrate que en el campo **"Skill Testing"** esté habilitado en: Development. 
10. Un poco mas abajo haz click en el tab de **Voice & Tone**.
11. Dentro de las etiquetas o tags de `speak`, **pega** el texto que copiaste.

```
<speak>
	Entrada más reciente en la bitácora del capitán. 
	día 537 en la misión de exploración. 
	La tripulación está contenta y feliz de estar a bordo de la nave. 
	Hoy vamos a intentar ingresar al Dominio, el cuadrante galáctico gamma. 
	Espero que estemos a salvo. 
	Hasta pronto.
	Cambio y fuera.
</speak>
```

12. Haz click en el botón **Play** y escucha el audio emitido.

Este audio es suficiente, sin embargo, podemos hacer una experiencia aun mas inmersiva y real agregando un SSML al texto.

13. Agrega una pausa con la etiqueta `break` después de la primer línea, como se muestra en el siguiente código de ejemplo:

```
Entrada más reciente en la bitácora del capitán. 
<break time='1s'/>
```

14. Después agrega la etiqueta `say-as` al número para que lo interprete como "dígitos"

```
Día <say-as interpret-as='digits'>537</say-as>
```

15. Finalmente, agrega un efecto especial utilizando la etiqueta `amazon:effect` con un susurro (`whisper`) a la cadena: "Espero que estemos a salvo".

```
<amazon:effect name='whispered'>Espero que estemos a Salvo.</amazon:effect>
```

16. Haz click en el botón de **Play** para escuchar el resultado. Estos pequeños cambios hacen que la respuesta de audio suene mas conversacional.


### Actividad 1.2: Agregar efectos de Sonido

Los efectos de sonido pueden mejorar su skill para crear una interacción de voz mas entretenida y encantadora de voz. Con la voz, los clientes no pueden ver de lo que aparece en la pantalla. En su lugar, pueden usar su propia imaginación y creatividad para recrear una imagen basada en su interacción con la skill a través del sonido y la voz.

Los efectos de Sonido pueden ser agregados utilizando la etiqueta de `audio`. La [librería de sonidos de Alexa](https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html) es un conjunto de clips de audio hospedados en la red de Amazon y listos para usarse en tus skills.

1. En un tab nuevo en el navegador, abre [Librería de Sonidos](https://developer.amazon.com/docs/custom-skills/ask-soundlibrary.html).
2. Busca el clip llamado **scifi alien voice (7)** y **copia** el código SSML.
4. Navega de regreso al tab de **Developer Console**.
5. Pega el código que copiaste después de la etiqueta `break` en el string y agrégala una vez mas al final de la cadena.

```
<speak>
	Entrada más reciente en la bitácora del capitán. 
	<break time='1s'/>
	<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>
	Día <say-as interpret-as='digits'>537</say-as> en la misión de exploración. 
	La tripulación está contenta y feliz de estar a bordo de la nave. 
	Hoy vamos a intentar ingresar al Dominio, el cuadrante galáctico gamma. 
	<amazon:effect name='whispered'>Espero que estemos a Salvo.</amazon:effect>
	Hasta pronto.
	Cambio y fuera.
	<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>
</speak>

```

6. Haz click en el botón **Play** para escuchar el resultado. El efecto de sonido es un excelente indicador de cuando inicia y termina la interacción con el registro en la bitácora.

### Actividad 1.3: Cambia las voces con Amazon Polly

Con docenas de voces en una variedad de idiomas, puede seleccionar la voz ideal y crear aplicaciones habilitadas para la voz que funcionen en muchos países diferentes. En este caso, podemos utilizar voces de Amazon Polly para diferenciar entre los personajes.

1. En un nuevo tab, navegue hasta [Amazon Polly](https://aws.amazon.com/polly/), polly es el Servicio de TTS (Text to Speech) de Amazon.
2. Polly tiene diferentes [Voces Disponibles](https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html#voice) que podemos utilizar desde Alexa utilizando la etiqueta `voice`
3. Navega de regreso a **Alexa Developer Console** tab y experimenta con las diferentes voces.
4. Para la skill usaremos la voz de Enrique para simular la voz del capitán. Inserta la etiqueta `voice` alrededor del texto que se escuchará con la voz de Enrique, como se muestra en el siguiente ejemplo:

```
<speak>
	Entrada más reciente en la bitácora del capitán.
	<break time='1s'/>
	<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>
    <voice name='Enrique'>
    	Día <say-as interpret-as='digits'>537</say-as> en la misión de exploración. 
    	La tripulación está contenta y feliz de estar a bordo de la nave. 
    	Hoy vamos a intentar ingresar al Dominio, el cuadrante galáctico gamma. 
    	<amazon:effect name='whispered'>Espero que estemos a Salvo.</amazon:effect>
    	Hasta pronto.
    	Cambio y fuera.
    	<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>
    </voice>
</speak>

```

7. Haz click en el botón **Play** para escuchar el resultado. Ahora tenemos una salida de voz que utiliza SSML, efectos de sonido y voces de Polly de manera efectiva.

### Actividad 1.4: Integra la nueva salida de audio a la skill

Ahora solo tienes que actualizar el código e incorporar el output speech que has generado al Handler del intent.

1. **Copia** el SSML que acabas de construir.
2. Navega al tab de **Code**.
3. Mueve el curso y encuentra el `CaptainsLogIntentHandler`
4. Asigna la variable `speechText` el contenido SSML.

```
    const speechText = 
    	"<speak>" +
		"	Entrada más reciente en la bitácora del capitán." +
		"	<break time='1s'/>" +
		"	<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>" +
   		"	<voice name='Enrique'>" +
   		" 		Día <say-as interpret-as='digits'>537</say-as> en la misión de exploración" +
   		" 		La tripulación está contenta y feliz de estar a bordo de la nave. " +
   		" 		Hoy vamos a intentar ingresar al Dominio, el cuadrante galáctico gamma." + 
   		" 		<amazon:effect name='whispered'>Espero que estemos a Salvo.</amazon:effect>" +
   		" 		Hasta pronto." +
   		" 		Cambio y fuera." +
   		" 		<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_07'/>" +
   		" 	</voice>" +
		"</speak>";

```

5. Haz click en **Save** para guardar tu código.


Adicionalmente tienes que generar una experiencia similar para los demás intents y así mantener una experiencia consistente.

Ya hemos creado un archivo de audio con la introducción para esta skill, estes archivo ya ha sido convertido a un [formato de audio compatible con Alexa](https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html#audio) y lo hemos publicado para que lo puedas utilizar en tu skill. Tu también puedes incorporar tus propios archivos de audios y hospedarlos en [Amazon S3](https://aws.amazon.com/s3/).  

6. Dentro del tab de **Code** navega al `LaunchRequestHandler`.
7. Actualiza la variable `speechText` para incorporar el clip de audio con un tag de `audio`

```
const speechText = "<audio src='https://ask-samples-resources.s3.amazonaws.com/workshop-starship-enterprise/sounds/launch_ES.mp3'></audio>";
```
Este audio se reproducirá cuando el usuario abra la skill.

Ahora actualizaremos la experiencia para el resto de los intents agregando efectos de sonido y voces de Amazon Polly.

8. Navega a `AnalyzeShipStatusIntentHandler`.
9. Actualiza la variable `speechText` para incorporar el siguiente código SSML.


```
 const speechText = "Analizando el status de la nave. "
 	+ "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_open_airlock_01'/> "
 	+ "La nave está en buenas condiciones. Sin daño. Nivel de Combustible lleno. "
 	+ "Sin causas actuales de alarma ";
```

10. Navega a `AttackIntentHandler`.
11. Actualiza la variable `speechText` para incorporar el siguiente código SSML.


```
    const speechText = "Desplegando misíles. " +
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_incoming_explosion_01'/> "
     + "fase de ataque activada. "
     + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_explosion_2x_01'/>";
```

12. Navega a `BeamMeUpIntentHandler`.
13. Actualiza la variable `speechText` para incorporar el siguiente código SSML.

```
    const speechText = "Preparando teletransportación "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_engines_on_large_01'/> "
      + "Atraer"
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_engines_on_short_burst_01'/>"
      + "Listo. ";
```

14. Navega a `SetHyperDriveIntentHandler`.
15. Actualiza la variable `speechText` para incorporar el siguiente código SSML.

```
    const speechText = "Entrando al Hiper Espacio "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_long_explosion_1x_01'/>";
```

16. Navega a `DefendIntentHandler`.
17. Actualiza la variable `speechText` para incorporar el siguiente código SSML.

```
    const speechText = "Activando escudos de defensa "
      + "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_sheilds_up_01'/>";
```

20. Haz click en **Save** para guardar tu código.
21. Haz Click en **Deploy** para desplegar tu código a tu hosted skill.

### Actividad 1.5: Prueba tu interacción de Voz

Ahora vas a probar tu skill en el portal de Desarrollo. Aquí puedes probar la interacción completa del usuario usando el simulador de Alexa incluido en la consola de desarrollo.

Ahora realizarás las pruebas en el portal de desarrollo. Aquí puedes probar toda la interaacción con el usuario con el simulador integrado de la consola de Alexa.

1. Haz click en el tab de **Test** en la parte superior de la consola de desarrollo, esto abrirá el simulador de Alexa.
2. En la parte superior encontrarás el mensaje **Test is disabled for this skill** seguido por un switch que está en **Off**. Haz click en el switch y selecciona "Development"
3. Por defecto, estará seleccionado el tab de **Alexa Simulator**, abajo encontrarás un campo que dice **Type or click…**, haz click en el ícono de micrófono y mantenlo presionado mientras dices: "abre comando espacial", o si lo prefieres escribe "abre comando espacial".
4. Ahora escucharás y verás la respuesta de Alexa con el mensaje que escribiste en el handler `LaunchRequest`. Experimenta un poco con tu modelo de interacción diciendo: "teletranspórtame scotty" o "lee la bitácora del capitán".

### ¡Felicitaciones! Has terminado el paso 1.

Ahora continúa el taller con el siguiente [**Paso 2 - Construye tu pantalla**](../Paso-2-Construye-Tu-Pantalla/)

Regresa a la [Página Principal](../README.md)
