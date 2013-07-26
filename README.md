#audio-tag-injector

Automatically adds html5 audio elements inline beside links to mp3, ogg, and 
wav files.

## Install it on node from npm

`npm install audio-tag-injector`

## Usage

If you're using this module outside of a browser you will have to supply a 
reference to a dom document object, unless you've called it `document`. I did 
not require any specific module for parsing the DOM, because there are a few 
out there and it would be rude of me to force you to use a specific one for 
such a simple function.

### Injection of Audio Tags in Browser

```
<!DOCTYPE html>
<html>
    <head>

        <script src="./src/audio-tag-injector.js"
              type="text/javascript">
</script>
        <title>
            Example Usage of audio-tag-injector.js
        </title>
    </head>
    <body>
        <h1>
            Example Usage of audio-tag-injector.js
        </h1>

        <p>
            Ooh! I made some audio! Check it out <a href="/some_audio_file.mp3">Kastor at the mic!</a>
        </p>
        <script type="text/javascript">

            audioTagInjector();
        </script>
    </body>
</html>
```

### Injection of Audio Tags in Node

```
var audioTagInjector = require('audio-tag-injector');
// parse your html into a DOM Document

// the argument is optional and defaults to `document`, if you've named your
// DOM Document something else you'll have to supply a refrence to it. For 
// this example, let's say you called it `myDocument`.
audioTagInjector(myDocument);

// Shazam. The document now contains audio elements you didn't have to write.
```
