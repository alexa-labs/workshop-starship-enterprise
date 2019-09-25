# Inicializar Comando Espacial

En esta sección del taller, crearás y configurarás una Skill de Comando Espacial  usando un "Alexa Hosted Skill" y el ASK (Alexa Skills Kit) programando en NodeJS. Cuando se lance esta skill el cliente podrá interactuar con una nave espacial mediante comandos de voz simples.

## Objetivos

Después de completar este paso, podrás:

- Crear una cuenta de desarrollador de Amazon.
- Crea y configuras una nueva skill utilizando "Alexa Hosted Skill" y el ASK (Alexa Skills Kit) programando en NodeJS
- Crear y configurar intents y ejemplos de utterances.
- Probar una skill utilizando el simulador de pruebas de Alexa y/o un dispositivo Echo.

## Requisitos previos

Este Lab requiere:

- Acceso a un equipo de computo con acceso a Wi-Fi, ejecutando Microsoft Windows, Mac OS X, o Linux (Ubuntu, SuSE, or RedHat).
- Un navegador de Internet como Chrome, Firefox o IE9 (Versiones anteriores no están soportadas)


## Objetivo: Completar la Skill "Comando Espacial"

Alexa es el servicio de voz que habilita a Amazon Echo. Alexa proporciona diferentes funcionalidades llamadas "Skills", esto permiten a los clientes interactuar con dispositivos usando la voz (responder preguntas, reproducir música y más).

El Kit de Skills de Alexa, ASK (Alexa Skills Kit) por sus siglas en inglés, es una colección de Interfaces de Programación o API de autoservicio, herramientas, documentación y ejemplos de código que facilitan el desarrollo de tus propias skills de Alexa, que posteriormente puede publicar para ponerlas disponibles en la tienda de Skills de Amazon.

ASK admite skills simples orientadas a comandos, por ejemplo: "Alexa, pide a "Comando Espacial" que diga hola mundo", en este caso "Comando Espacial" es el invocation name de la skill Comando Espacial. Adicionalmente permite crear sofisticados diálogos con múltiples comandos y parámetros, por ejemplo: "Alexa, pregunta a "Horóscopo Diario" ¿cuál es el Horóscopo de Geminis?" El Alexa Skill Kit (ASK) es un conjunto de herramientas muy simple para aprender a construir para la voz.

Este laboratorio lo guiará para crear una Skill simple que permite al cliente interactuar con las funciones de una nave espacial. Usarás el ASK para aprender los fundamentos de cómo construir una experiencia de voz para tus usuarios.

### Actividad 0.1: Crea una cuenta en developer.amazon.com (o ingresa a tu cuenta existente)

1. Navega al Portal de Desarrollo de Amazon en [https://developer.amazon.com/alexa](https://developer.amazon.com/alexa).
2. Haz click en **Sign In** en la parte superior derecha para crear una cuenta. Es muy importante que selecciones la ubicación adecuada, si estás en México, selecciona México, si estás en España, selecciona España, recuerda que tenemos programas de recompensas para desarrolladores y tener la información incorrecta puede resultar en que te quede fuera de alguno de estos programas.


### Actividad 0.2: Crea la Skill Comando Espacial

1. Una vez que estés autenticado con tu usuario y contraseña, haz click en **Your Alexa Dashboards** en la parte superior derecha y selecciona **Skills**
2. Si es la primera vez que creas una Skill, haz click en **Get Started** debajo de **Alexa Skills Kit**. Alexa Skills Kit te permitirá agregar un nuevo skill a Alexa. (La otra opción, Alexa Voice Service, es cuando quieres habilitar Alexa en otros dispositivos como una Raspberry Pi).
3. Para iniciar el proceso de creación de la skill haz click en el botón **Create Skill** ubicado a la derecha.

### Actividad 0.3: Información de la Skill

1. En el campo **Skill Name** ingresa **Comando Espacial**.
2. En el campo **Default Language**: Si estás en México, selecciona **Español (MX)**. Si estás en España, selecciona **Español (MX)**, Si estás en Estados Unidos, selecciona **Español (US)**.
3. En el campo **Skill Type** selecciona la opción **Custom**.
4. Debajo en la sección _choose a method to host your skill's backend resources_, selecciona **Alexa-Hosted**. Esto te permitirá alojar todo el código de tu skill dentro de la consola de Alexa. Si prefieres alojar tu código en el servicio de AWS Lambda en tu cuenta de AWS (Amazon Web Services), o en tu propio servidor HTTP, puedes seleccionar "Provision you own". Este taller está diseñado para usar únicamente Alexa-Hosted y trabajar dentro de la consola de desarrollo.
5. Selecciona la opción **Create Skill** en la parte superior derecha.

### Actividad 0.4: Modelo de Interacción

1. En el menú de navegación en la izquierda haz click en **Invocation**, por default es igual al nombre que seleccionaste para tu skill. Este es el nombre de invocación que abrirá tu skill: **comando espacial**. Por ejemplo: "Alexa, lanza comando espacial". Recuerda que el nombre de invocación o puede ser de una sola palabra a menos que sea una marca registrada. Para mas detalles al seleccionar tu nombre de invocación visita: [Como seleccionar un nombre de invocación](https://developer.amazon.com/docs/custom-skills/choose-the-invocation-name-for-a-custom-skill.html)

3. A la izquierda en el menú de navegación selecciona: **JSON Editor**. Esto muestra lo que conocemos como _modelo de lenguaje_ y describe toda la capa de voz de tu skill.
4. Copia el **contenido** del archivo JSON que corresponda según el modelo de lenguaje que elegiste: [es-MX](./es-MX.json), [es-ES](./es-ES.json), [es-US](./es-US.json)
5.  Reemplaza **todo el contenido** actual de la consola de desarrollo, por el contenido del JSON que copiaste en el paso anterior.

Cada uno de los campos de este JSON son un **intent**. Los intents representan lo que tu skill puede hacer y se mapearán contra  a una intención y Alexa responderá con una acción que generará una respuesta. Para solicitar a Alexa una acción, el usuario dice un **utterance**. En el caso de **StopIntent**, podríamos agregar utterance "Apaga Comando Espacial" lo que se traducirá como una petición de cerrar la skill. 

Como podemos ver, esta skill tiene siete intents: `AnalyzeShipStatusIntent`, `AttackIntent`, `BeamMeUpIntent`, `SetHyperDriveIntent`, `CaptainsLogIntent`, `DefendIntent`, and `ReturnHomeIntent`. Cada intent tiene varias utterances que actúan como datos de entrenamiento para que Alexa detecte tu intención y el contexto de la acción y así pueda lanzar un evento y construir una respuesta.

De forma opcional, podrías incorporar **Slots** en tus utterances. Los **Slots** son parámetros variables de lo que el usuario puede decir. Para mas información sobre slots, puedes visitar: [Slot Type Reference](https://developer.amazon.com/docs/custom-skills/slot-type-reference.html). Para los objetivos de este taller, continuaremos sin slots.

5. Haz click en el botón **Save Model**. Esto iniciará el proceso de crear tu modelo de interacción. (Si no has hecho ningún cambio al código, el botón permanecerá gris).
6. Ahora has notado que en el JSON, todos los intents tienen utterances de ejemplo excepto `BeamMeUpIntent`. Haz **click** en el intent `BeamMeUpIntent` en el menú de navegación.
7. La consola muestra la interfaz gráfica donde puedes agregar mas utterances de ejemplo para tu intent. **Agrega** cada uno de los siguientes utterances individualmente:

```
teletransportación
teletranspórtame
teletranspórtame scotty
teletranspórtanos
teletranspórtanos a la nébula
activa teletransportación
```
cada uno de estos utterances muestra una combinación de lo que los usuarios pueden decir para detectar su intención y construir una respuesta.

No olvides que estos **utterances** de ejemplo son _datos de entrenamiento_ para que Alexa pueda entender la intención del usuario en el contexto de la skill. **Opcionalmente** Puedes agregar mas utterances a todos los intents en el modelo de lenguaje que estás construyendo.

8. Finalmente haz click en **Build Model** para construir tu modelo de interacción.

Hemos terminado con el Modelo de Interacción de esta sección.


### Tarea 0.5: Codificación

Tu skill necesita estar conectada a un **endpoint** que ejecuta la lógica de tu skill. En este taller elegiste **Alexa Hosted**, esto te permite editar el código en la consola de desarrollo de Alexa.

1. En la parte superior selecciona el tab de **Code**.

Ahora verás el código que recibe la intención en forma de intent y ejecuta una acción para que Alexa responda a la petición del usuario. Al crear la skill se usó por default la plantilla de "Hola Mundo" o "Hello World" en inglés usando el lenguaje de programación NodeJS, ahora tienes que actualizar las funciones para que correspondan a los intents de tu modelo de interacción.

2. **Copia** el código de [`index.js`](./index.js).
3. **Reemplaza** todo el contenido de el editor pegando todo el código que copiaste.

Analicemos, hay 11 handlers en este código. El primero es `LaunchRequestHandler` este handler es invocado cuando el usuario abre la skill diciendo: "Alexa, abre Comando Espacial". Los siguientes seis handlers están asociados con los intents que construiste anteriormente. Finalmente, los cuatro últimos handlers manejan los built-in intents requeridos para responder a la ayuda, cancelación y manejo de errores.

Como puedes observar, cada Handler tiene dos métodos: Uno llamado `canHandle` y otro `handle`. El método `canHandle` define las condiciones para que el handler sea llamado, este método tiene que regresar verdadero (true) para que el método `handle` sea llamado y se ejecute la lógica que define.

3. Haz click en **Save** para guardar tu código.
4. Haz click en **Deploy** para desplegar tu código y habilitarlo en el ambiente de desarrollo de tu skill.

Una vez que recibas la notificación de que tu código ha sido guardado (Save) y desplegado (Deploy), has vinculado tu código con tu modelo de interacción y estas listo para realizar las pruebas.


### Tarea 0.6: Prueba tu interacción con Voz

Ahora realizarás las pruebas en el portal de desarrollo. Aquí puedes probar toda la interaacción con el usuario con el simulador integrado de la consola de Alexa.

1. Haz click en el tab de **Test** en la parte superior de la consola de desarrollo, esto abrirá el simulador de Alexa.
2. En la parte superior encontrarás el mensaje **Test is disabled for this skill** seguido por un switch que está en **Off**. Haz click en el switch y selecciona "Development"
3. Por defecto, estará seleccionado el tab de **Alexa Simulator**, abajo encontrarás un campo que dice **Type or click…**, haz click en el ícono de micrófono y mantenlo presionado mientras dices: "abre comando espacial", o si lo prefieres escribe "abre comando espacial".
4. Ahora escucharás y verás la respuesta de Alexa con el mensaje que escribiste en el handler `LaunchRequest`. Experimenta un poco con tu modelo de interacción diciendo: "teletranspórtame scotty" o "lee la bitácora del capitán".


**Optional**: Adicionalmente puedes cambiar las respuestas que emita Alexa editando el contenido de la variable `speechOutput` en el código de tu skill y regresa a realizar las pruebas.

### ¡Felicitaciones! Has terminado el paso 0.

Ahora continúa el taller con el siguiente [Paso 1 - Agrega SSML, efectos de sonido y Amazon Polly](../Paso-1-Agrega-SSML-Efectos-De-Sonido-Y-Amazon-Polly/)

Regresa a la [Página Principal](../README.md)

