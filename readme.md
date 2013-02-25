# mqa.js (meqa.js)
A small (540 byte, gzipped+minified!), modern library for managing media queries programmatically (i.e. in JavaScript).
Most media query libraries I've seen forces the developer to duplicate their media query syntaxes (from CSS file to JavaScript file). See the documentation for more information and how to use the API.

* [Demo](http://peol.github.com/mqa.js/demo/index.html)
* [Documentation](http://peol.github.com/mqa.js/mqa.html)

# Browser support
Every browser that supports `window.matchMedia` and Array Extras should be fine. Currently tested on Firefox 19, Safari 6, Chrome 24, IE9 (with [polyfills](https://github.com/paulirish/matchMedia.js/))*, IE10.

# License
Dual license, MIT/GPL. Use whatever fits your project.

_* = When using the polyfill, an initial event is triggered when a media query is matched when loading the document. This is not the case with native implementations.