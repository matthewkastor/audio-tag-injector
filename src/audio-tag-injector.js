/*jslint
    white: true,
    browser: true,
    vars: true
*/

/**
 * Automatically adds html5 audio elements inline beside links to
 *  mp3, ogg, and wav files. Includes an event handler to show an
 *  error message if the audio file fails to load. Includes an error message
 *  if the audio element is not supported.
 * @param {HTMLDOMDocument} documentRef Optional A reference to the document
 *  object. Defaults to `document`.
 * @author Matthew Christopher Kastor-Inare III
 * @version 20130726
 * @example
 *  audioTagInjector();
 */
function audioTagInjector (documentRef) {
    "use strict";
    documentRef = documentRef || document;
    function getMimeType (href) {
        var type = null;
        switch (true) {
            case /\.mp3$/.test(href) :
                type = 'audio/mpeg';
                break;
            case /\.ogg$/.test(href) :
                type = 'audio/ogg';
                break;
            case /\.wav$/.test(href) :
                type = 'audio/wav';
                break;
            default :
                break;
        }
        return type;
    }
    function generateAudioTag (linkElement) {
        function errorHandler (ev) {
            var d = documentRef.createElement('span');
            var audio = ev.target.parentNode;
            d.textContent = 'Audio file failed to load!';
            audio.parentNode.replaceChild(d, audio);
        }
        var audio = documentRef.createElement('audio');
        var source = documentRef.createElement('source');
        var sourceType = getMimeType(linkElement.href);
        var unavailable = documentRef.createElement('p');
        
        audio.setAttribute('controls', 'controls');
        audio.setAttribute('preload', 'none');
        
        source.setAttribute('src', linkElement.getAttribute('href'));
        source.setAttribute('type', sourceType);
        // show error message if audio fails to load.
        source.addEventListener('error', errorHandler, false);
        
        unavailable.textContent = 'Your browser does not support the audio element.';
        
        audio.appendChild(source);
        audio.appendChild(unavailable);
        
        // break link to new line
        linkElement.parentNode.insertBefore(documentRef.createElement('br'), linkElement);
        // insert audio before the link
        linkElement.parentNode.insertBefore(audio, linkElement);
        // break between inserted audio and link
        linkElement.parentNode.insertBefore(documentRef.createElement('br'), linkElement);
        // break after link
        linkElement.parentNode.insertBefore(documentRef.createElement('br'), linkElement.nextSibling);
    }
    Array.prototype.slice.call(documentRef.links).forEach(function (link) {
        if(null !== getMimeType(link.href)) {
            generateAudioTag(link);
        }
    });
}

try {
     module.exports = audioTagInjector;
} catch (e) {
    // module.exports is not defined
}
