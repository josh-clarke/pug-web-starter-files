# HTML Prototype Starter Files

![Open Issues](https://img.shields.io/github/issues/josh-clarke/html-prototype-starter-files.svg) ![Project Forks](https://img.shields.io/github/forks/josh-clarke/html-prototype-starter-files.svg) ![GitHub Stars](https://img.shields.io/github/stars/josh-clarke/html-prototype-starter-files.svg) ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

The purpose of these starter files are to provide a starting point for a set of flat HTML files that can be used as a prototype or a starting point for further templating in a web app or CMS.

## Getting Started

1. Clone repository or download the ZIP file
2. Inside the project folder run the following
  * `npm install`
  * `bower install`
3. Type `grunt` to build and watch for changes

## Requirements:

* NodeJS/NPM
* Grunt (installed globally) (`npm i -g grunt-cli`)

## Tools

These tools are all installed when you run `npm install` and `bower install` after cloning the repo.

### CSS
Sass, Autoprefixr (via PostCSS), Modular Scale SASS library

Autoprefixr defaults to "last two versions" but, if you need to adjust based on your requirements: https://github.com/ai/browserslist#queries

### JS

#### Building
* [JSHint](https://github.com/jshint/jshint) for linting
* [Uglifier](https://github.com/lautis/uglifier) for minification

#### Included Libraries
* [JQuery](https://github.com/jquery/jquery)
* [Modernizr](https://github.com/Modernizr/Modernizr)
* [Object Fit Images](https://github.com/bfred-it/object-fit-images) polyfill for IE use of `object-fit`

### HTML

Default file based on [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)

#### Templating

[Codekit](https://codekitapp.com/help/kit/) `.kit` files for _very simple_ templating with little to no overhead.

* Includes: `<!-- @import 'partials/_partial.kit' -->`
* Variables: `<!-- $title: My Great Website -->`
  * `<title><!--$title--></title>` => `<title>My Great Website</title>`

**Codekit app not required.** Uses [grunt-codekit](https://www.npmjs.com/package/grunt-codekit) plugin. Grunt watch will keep this running and compiling based on the watched files. CTRL-C to quit.

Here is everything you can do with kit: https://codekitapp.com/help/kit/

### LiveReload:

LiveReload is on - snag the [LiveReload Chrome Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) easy working.

### Bower

Bower is used to pull down and manage components in `src/bower_components`. It is not set up to use those components directly (except for the modular scale), so copy-paste what you need from bower's download directory, or hack it yourself.

### Paths

Working files are in `src/` directory. Built files output to `dist`.

## Notes

It's recommended that you do your own image minification or hack your own automation.

Recommended SVG optimization tool: https://jakearchibald.github.io/svgomg/

## Thanks and Credits

Based on:

* https://github.com/gjhead/Starter-Files-Grunt

The starter files include some elements from the following open source projects:

* https://github.com/h5bp/html5-boilerplate
* https://github.com/necolas/normalize.css
* https://github.com/twbs/bootstrap
