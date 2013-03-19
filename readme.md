# mqa.js (meqa.js)
A small (540 byte-ish, gzipped+minified!), modern library for managing media queries programmatically (i.e. in JavaScript).
Most media query libraries I've seen forces the developer to duplicate their media query syntaxes (from CSS file to JavaScript file). See the documentation for more information and how to use the API.

* [Demo](http://peol.github.com/mqa.js/demo/index.html) (no polyfill)
* [Documentation](http://peol.github.com/mqa.js/mqa.html)
* [Blog post explaining it](http://andreehansson.se/introducing-mqa-js/)

# Browser support
Every browser that supports `window.matchMedia` and Array Extras should be fine. Currently tested on Firefox 19,
Safari 6, Chrome 24, IE9 (with polyfills, see [this](https://github.com/weblinc/media-match) and [this](https://github.com/paulirish/matchMedia.js/)*), IE10, iOS6.

# Develop
mqa.js uses [grunt 0.4](http://gruntjs.com/).

```
$ npm install -g grunt-cli
$ cd path/to/mqa.js
$ npm install
// running separate tasks:
$ grunt jshint
$ grunt test
// above two are equal to running just:
$ grunt
```

# Contributing
There's no real style-guide followed, but please follow the existing code's style. And remember to
always run `grunt` before sending a pull request to make sure the unit tests and JSHint rules are passing.

When new features are being developed, unit tests and JSDoc documentation should be added as well. See existing
tests and documentation for inspiration.

# License
Dual license, MIT/GPL. Use whatever fits your project.

_* = When using this polyfill, an initial event is triggered when a media query is matched when loading the document. This is not the case with native implementations and other polyfills I've tried._
