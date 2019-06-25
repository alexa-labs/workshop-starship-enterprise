# Agregar la Interfaz Gráfica de Usuario a la Interfaz de Voz

La combinación de experiencias de voz y experiencias visuales puede hacer que las skills de Alexa sean aún más agradables, atractivas y simples para los clientes. Cuando creas una experiencia multimodal, combinas voz, tacto, texto, imágenes, gráficos, audio y video en una sola interfaz de usuario. El resultado es una experiencia #VoiceFirst donde siempre favorecemos la voz, pero complementada con imágenes. 

## Objetivos

Después de completar este taller, tu podrás:

- Utilizar los documentos APL que creaste en el código de tu skill
- Mostrar tus pantallas de forma dinámica utilizando comando de voz
- Manjar eventos de la pantalla en tu servicio de voz


## Requisitos Previos

This lab requires:

Este Lab requiere:

- Acceso a un equipo de computo con acceso a Wi-Fi, ejecutando Microsoft Windows, Mac OS X, o Linux (Ubuntu, SuSE, or RedHat).
- Un navegador de Internet como Chrome, Firefox o IE9 (Versiones anteriores no están soportadas)
- Haber completado el [Paso 0 - Inicializa el Comando Espacial de tu nave] (./Paso-0-Inicializa-Comando-Espacial/)
- Haber completao el [Paso 1 - Agregar SSML, Efectos de Sonido y Voces de Amazon Polly] (./Paso-1-Agrega-SSML-Efectos-De-Sonido-Y-Amazon-Polly/)
- Haber completado [Paso 2 - Construye tu Pantalla usando APL] (./Paso-2-Construye-Tu-Pantalla/)


## Objetivo: Crear la experiencia visual e integrarla con la interfaz de voz


La creación de interfaces de usuario de voz con APL utiliza algunos conceptos que se encuentran en el desarrollo de aplicaciones web, específicamente en relación con el estilo, el uso de componentes anidados y la jerarquía de documentos, pero también mantiene la seguridad, escalabilidad y la capacidad de procesamiento en todos los dispositivos habilitados para Alexa.

En este paso, tomarás la pantalla que creaste en el paso anterior, la actualizarás para que sea dinámica según la interacción solicitada y la enviarás en una directiva con su respuesta de voz.

### ACtividad 3.0: Revisar las interfaces soportadas 

Has terminado de crear tus pantallas para la skill, ahora tienes que integrar el código APL a tu Skill. Lo primero que tienes que hacer es determinar si el dispositivo soporta APL.

1. Asegurate 	que estas en el tab de **Code** en el **Developer Portal**. 
2. Navega al archivo **`index.js`**
3. Mueve el cursor hasta la parte baja del documento y agrega la siguiente función (helper function):

```
function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface != null && aplInterface != undefined;
}
```

Esta función determina si el `handlerInput` que recibe como parámetro puede soportarrespeustas que contengan la directiva de APL. Llamaremos a esta función cada que enviemos una directiva de APL.


### Actividad 3.1: Agregar el documento APL a la skill 

Ahora agregas la directiva APL en la respuesta de la petición de tipo LaunchRequest. Una directiva especifica como el compilador (u otro traductor) debe procesar la respuesta. En este caso, nuestra directiva es de tipo: `Alexa.Presentation.APL.RenderDocument`, esto indica que debe interpretar la respuesta que estamos regresando como un documento APL y el documento que usará es `launchrequest.json`.

1. Mueve el cursor a `LaunchRequest`
2. Una línea antes del return, **Agrega** una condicional if para determinar si el dispositivo tiene pantalla utilizando nuestra función: **supportsAPL**.

```
if (supportsAPL(handlerInput)) {

}
```
3. En el if, **pega** el siguiente código APL con la directiva y el nombre del documento JSON que describe como mostrar la pantalla:

```
if (supportsAPL(handlerInput)) {
    handlerInput.responseBuilder
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./launch.json')
      });
}
```
4. Hemos agregado un documento APL a la skill y lo estamos enviando como respuesta.  Haz click en **Save** y **Deploy** para guardar y desplegar tu código respectivamente.


### Actividad 3.2: Enviar una fuente de datos (datasource)junto con la directiva APL.

Hemos enviado una pantalla que tiene sentido para el `LaunchRequest` and `ReturnHomeIntent`, sin embargo si queremos una experiencia mas envolvente debemos considerar como cambiar la pantalla en función a la petición del usuario.

En nuestra implementación, tiene sentido actualizar el video de fondo para adecuarlo a las necesidades de cada acción. Esto lo podemos lograr enviando el nombre de video como parámetro usando [_data-binding_](https://developer.amazon.com/docs/alexa-presentation-language/apl-data-binding-evaluation.html) desde la fuente de datos o [_datasource_](https://developer.amazon.com/docs/alexa-presentation-language/apl-document.html#maintemplate). 

Los parámetros definidos en el `mainTemplate` de nuestro documento APL 
se completarán con las fuentes que enviamos como parámetro en el datasource en la directiva.

1. **Navegae** al archivo `launch.json`.
2. **Mueve** el curso hasta el componente `Video`.
3. Actualiza la fuente o `source` de el componente de `Video` para que sea:

```
"source": "${payload.shipCommanderData.properties.video}",
```

La propiedad `datasource` es un objeto JSON que puede contener cualquier tipo de información para llenar el documento APL. Esta información es accesible desde el `mainTemplate` de tu documento APL en la variable `payload` usando los parámetros `parameters` via databinding.

4. **Guarda** tu código.

Ahora tienes que enviar un `datasource` que contenga la URL con los videos que quieres mostrar.

5. Abre `index.js`
6. En la parte superior del código, después de definir la constante `GOODBYE` **copia y pega** el siguiente objeto JSON, que contiene los URLS de los videos:

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

7. Encuentra el `LaunchRequest`
8. **Actualiza** la directiva APL para incluir el datasource.

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
9. **Guarda** tu codigo.

### Actividad 3.3: Manejo de Eventos de Usuario desde los TouchWrappers

Ahora necesitamos aceptar e interpretar los eventos de usuario o `UserEvent` que son enviados cuando se toca un `TouchWrapper`.

Cuando el usuario toca cualquiera de los botones, la skill debe enviar el intent respectivo.

1. Navega hasta la opción de `canHandle` en el `LaunchRequest`.

Esta función debe ser llamada cuando el usuario dice _"Abre Comando Espacial_", "_regresa a casa_" o cuando toca el botón de "_Regresar a Casa_" en la pantalla. Actualmente tenemos dos instancias. Actualmente hemos logrado manejar los dos primeros casos, nos falta el tercero, por lo que necesitamos insertar la lógica en el método `canHandle` para incorporar los eventos de usuario.

Cada botón tiene una propiedad de `arguments`. Esto es una variable que se establece para identificar que botón fue presionado.

2. In en método `canHandle`, inserta el código en la condicional para aceptar `Alexa.Presentation.APL.UserEvent`:

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

Primero revisamos si la petición es de tipo `UserEvent`, si los argumentos no vienen vacíos y si la posición cero de la lista de argumentos (`arguments[0]`) es igual a "home" lo que significa que el usuario presionó el botón: "Regresar a Casa".

La skill ahora interpreta y maneja los eventos de toque o TouchWrapper events de la forma adecuada para el `LaunchRequest` y `ReturnHomeIntent`.

3. **Guarda** tu código.

### Actividad 3.5: Actualiza cada intent para incorporar APL y manejar los eventos de toque de forma adecuada

Ya has agregado la lógica para enviar de forma dinámica la información de la skill al documento APL, ahora tenemos que hacer lo mismo para cada uno de los intents.


1. Mueve el cursor a `AnalyzeShipStatusIntentHandler`
2. En el método `canHandle`, **Copia y pega** el siguiente código:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AnalyzeShipStatusIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'analyze');
  }
```

3. En el método `handle`, **copia y pega** el siguiente código antes del return:

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

4. Mueve el cursor a `AttackIntentHandler`
5. En el método `canHandle`, **Copia y pega** el siguiente código:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AttackIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'attack');
  }
```

6. En el método `handle`, **copia y pega** el siguiente código antes del return:

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

7. Mueve el cursor a `BeamMeUpIntentHandler`
8. En el método `canHandle`, **Copia y pega** el siguiente código:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BeamMeUpIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'beam');
  }
```

9. En el método `handle`, **copia y pega** el siguiente código antes del return:

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

10. Mueve el cursor a `SetHyperDriveIntentHandler`
11. En el método `canHandle`, **Copia y pega** el siguiente código:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SetHyperDriveIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'warp');
  }
```

12. En el método `handle`, **copia y pega** el siguiente código antes del return:

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

13. Mueve el cursor a `CaptainsLogIntentHandler`
14. En el método `canHandle`, **Copia y pega** el siguiente código:

```
canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CaptainsLogIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'checkLog');
  }
```

15. En el método `handle`, **copia y pega** el siguiente código antes del return:

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

16. Mueve el cursor a `DefendIntentHandler`
17. En el método `canHandle`, **Copia y pega** el siguiente código:

```
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DefendIntent'

      || (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
          && handlerInput.requestEnvelope.request.arguments.length > 0
          && handlerInput.requestEnvelope.request.arguments[0] === 'defend');
  }

```

18. En el método `handle`, **copia y pega** el siguiente código antes del return:

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

19. Mueve el cursor a `HelpIntentHandler`
20. En el método `Handle`, **Copia y pega** el siguiente código antes del return:

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

21. **Guarda** y **Despliegua** tu código haciendo click en **save** y **deploy** respectivametne.

Ahora ya has agregado todos los documentos APL a tus skills.

### Actividad 3.5: Prueba que tu pantalla y los eventos de toque funcionen correctamente.

Ahora vas a probar la skill para asegurarte que funcione correctamente y que cada uno de los botones funcionen bien.

1. Navega al tab de **Test** en el Developer Portal.
2. Asegúrate que la opción de mostrar pantalla o **Device Display** esté seleccionada
3. En la parte superior encontrarás el mensaje **Test is disabled for this skill** seguido por un switch que está en **Off**. Haz click en el switch y selecciona "Development"
4. Por defecto, estará seleccionado el tab de **Alexa Simulator**, abajo encontrarás un campo que dice **Type or click…**, haz click en el ícono de micrófono y mantenlo presionado mientras dices: "abre comando espacial", o si lo prefieres escribe "abre comando espacial".
5. Mueve el cursos hacia abajo y descubrirás como se ve tu pantalla.
6. Haz **Click** en uno de los botones. Asegúrate que el evento se ha lanzado correctamente y se muestra el video correspondiente al video. 
7. Toca unos por uno los botones y asegurate que se lanza el video correcto.

### Felicitaciones! Has terminado el paso tres!

Son esto hemos llegado al final de este taller, espero haberte inspirado a crear nuevas skills y saludos!

Return to the [Workshop Main Page](../README.md)
