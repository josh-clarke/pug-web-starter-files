# SBA HTML Prototype Starter Files

The purpose of these starter files are to provide a starting point for a set of flat HTML files that can be used as a prototype or a starting point for further templating in a web app or CMS.

## Getting Started

1. Clone repository or download the ZIP file
2. Inside the project folder run the following
  * `npm install`
  * `bower install`

## Requirements:

* NodeJS/NPM
* Grunt (installed globally) (`npm i -g grunt-cli`)

## Tools

These tools are all installed when you run `npm install` and `bower install` after cloning the repo.

### CSS:
Sass, Autoprefixr (via PostCSS), Modular Scale SASS library

Autoprefixr defaults to "last two versions" but, if you need to adjust based on your requirements: https://github.com/ai/browserslist#queries

### JS:
JSHint for linting and uglifier for minification.

`jquery` library

`object-fit-images` polyfill for IE use of `object-fit`

### HTML:

Default file based on HTML5 Boilerplate

CodeKit .kit files for --very simple-- templating with little to no overhead.

https://www.npmjs.com/package/grunt-codekit

It's a nice simple engine that allows for includes and variables.

Here is everything you can do with kit: https://codekitapp.com/help/kit/

Grunt watch will keep this running and compiling based on the watched files. CTRL-C to quit.

### LiveReload:

LiveReload is on - snag the livereload Chrome plugin for easy working:

https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

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

Integrates some elements from:

* https://github.com/h5bp/html5-boilerplate
* https://github.com/necolas/normalize.css
* https://github.com/twbs/bootstrap
* https://github.com/modularscale/modularscale-sass
