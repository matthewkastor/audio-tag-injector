#audio-tag-injector

Automatically adds html5 audio elements inline beside links to mp3, ogg, and 
wav files.

## Where do I get it?

You can download it from github at 
[https://github.com/matthewkastor/audio-tag-injector](https://github.com/matthewkastor/audio-tag-injector) 
or, if you have node installed you can get it from npm

`npm install audio-tag-injector`

## Usage

Using this module in your browser is as simple as including it in your page 
and calling `audioTagInjector()` after the page has loaded. See `example.html` 
in the root directory of this package.

The HTML5 audio tags will be added inline where this script finds a link 
whose `href` attribute ends in mp3, wav, or ogg. A basic error handler is 
added to the audio element to inform the user if the audio file couldn't load. 
The audio element also displays an error message if it is not supported in 
the users browser.

If you're using this module outside of a browser you will have to supply a 
reference to a dom document object, unless you've called it `document` 
and declared it globally. I did not require any specific module for parsing the 
DOM, because there are a few out there and it would be rude of me to force you 
to use a specific one for such a simple function.

### Injection of Audio Tags in Browser

```
<!DOCTYPE html>
<html>
    <head>

        <script src="./node_modules/audio-tag-injector/src/audio-tag-injector.js"
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
// parse your html into a DOM Document using jsdom
// or something https://npmjs.org/package/jsdom

var fs = require('fs'); 
var jsdom = require("jsdom").jsdom;
var audioTagInjector = require('audio-tag-injector');

var html = fs.readFileSync('example.html', 'utf8');
// javascript written for the browser expects global
// window and document objects
var document = global.document = jsdom(html, null, {
    features: {
        FetchExternalResources : false,
        ProcessExternalResources : false
    }
});
var window = global.window = global.document.parentWindow;

audioTagInjector();
// alternatively, if you've called the 
// document object something other than 
// document, you may supply it as the 
// first argument and everything will 
// work out fine.
// audioTagInjector(nonstandardDocumentReference);

console.log(document.documentElement.innerHTML);

// Shazam. The document now contains audio 
// tags you didn't have to write.
```
