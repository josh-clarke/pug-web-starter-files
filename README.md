# Nunjucks Web Starter Files

These starter files can be used to generate a prototype or flat-file website. The Nunjucks template language is used for the HTML due to its close relationship to Twig. After using this starter kit to build flat HTML prototypes, the Nunjuck files can then be re-used as a starter point for Twig-based templates such as [Wordpress with Timber](https://wordpress.org/plugins/timber-library/) or [Craft CMS](https://craftcms.com), and any platforms which can use Nunjucks or Jinja.

![Open Issues](https://img.shields.io/github/issues/josh-clarke/nunjucks-web-starter-files.svg) ![Project Forks](https://img.shields.io/github/forks/josh-clarke/nunjucks-web-starter-files.svg) ![GitHub Stars](https://img.shields.io/github/stars/josh-clarke/nunjucks-web-starter-files.svg) ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Requirements:

* [NodeJS](https://nodejs.org)
* [Gulp](https://github.com/gulpjs/gulp) (installed globally)
  * `npm i -g gulp-cli`
* [Bower](https://github.com/bower/bower) (installed globally)
  * `npm i -g bower`

## Getting Started

1. Fork and clone repository or download the ZIP file
2. Inside the project folder, run the following
    * `npm install`
    * `bower install`
3. Type `gulp` to build and watch for changes
    * Launches web server with LiveReload at http://localhost:8080

## Features

### HTML

* [Nunjucks](https://mozilla.github.io/nunjucks/) template language (nearly equivalent to Twig), compiles to flat HTML
  * Extend/Include templates, Variables, If/Else logic and [more](https://mozilla.github.io/nunjucks/templating.html)
* Starter template based on [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)

### CSS

* [Sass](https://www.npmjs.com/package/gulp-sass) for writing CSS
  *  Processes through [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) (last 2 browser versions)
  * Includes [normalize.scss](https://github.com/JohnAlbin/normalize-scss) library
  * Includes [modularscale-sass](https://github.com/modularscale/modularscale-sass) library
  * Includes base styles and common global variables
  * Includes [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) to trace errors to the source Sass files

### JavaScript
* Automatically includes and concatenates installed Bower JavaScript libraries
    * jQuery included by default
    * IE Object Fit polyfill included
    * Console log error prevention script included
* Compresses JS files with [Uglify](https://www.npmjs.com/package/gulp-uglify)
* [Modernizr Gulp plugin](https://www.npmjs.com/package/gulp-modernizr) automatically generates custom Modernizr file from JS files
    * Does **not** include `html5shiv`
* No linter because my editor does this - add your own if needed
* [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) is available but not configured for JavaScript

### Images
* Images optimized by default with [imagemin](https://github.com/sindresorhus/gulp-imagemin)


## Templating

The best way to template with [Nunjucks](https://mozilla.github.io/nunjucks/templating.html), a Twig-like template language, is to extend from a base template. Base templates or partials should be prefixed with an underscore `_` to prevent them from compiling into their own standalone templates. For example:

**Base Template (Simplified): `_base.njk`**

```nunjucks
<!DOCTYPE html>
<html>
  <head><title>{{ title }}</title></head>
  <body>
    {% block content %}
      <p>Fallback content</p>
    {% endblock content %}
  </body>
</html>
```

**Extended Template: `index.njk`**

```nunjucks
{% extends "_base.njk" %}

{% set title = "Hello World" %}

{% block content %}
  <h1>Hello World!</h1>
  <p>You've reached my site!</p>
{% endblock content %}
```

**Outputs (Simplified): `index.html`**

```html
<!DOCTYPE html>
<html>
  <head><title>Hello World</title></head>
  <body>
    <h1>Hello World!</h1>
    <p>You've reached my site!</p>
  </body>
</html>
```

# Default Setup

By default, the following setup is used:

* Working and Production directories
    * `./src/` - Working directory
    * `./dist/` - Production directory
        * This directory and its subfolders will not be created until the first `gulp` build command
* GULP build tool
    * `gulp` command for default build with LiveReload preview, also starts watch
    * `gulp watch` command to build/copy css, js, html, images on save
* HTML/Nunjucks
    * Build templates in `./src/templates/` using either the `.njk`, `.nunjucks`, or `.html` extension
    * Name partials and base extends with a leading underscore `_`
    * Builds to `./dist/`
* CSS/SASS
    * Write SCSS or SASS in `./src/sass/`
      * `main.scss` - Include partials in here
      * `base/` - Base styles
      * `modules/` - Per module styles
      * `vendor/` - Vendor module styles
    * Name partials with a leading underscore `_`
    * Concatenates to `./dist/css/main.css`
* JS
    * User scripts in `./src/js/*.js` concatenated to `./dist/js/scripts.js`
    * Non-Bower-Managed plugins in `plugins/` concatenated to `./dist/js/vendor/plugins.js`
    * Bower component management
        * Installs component in `./bower_components/`
        * Concatenates to `./dist/js/vendor/libs.js`
        * JQuery included; concatenates to `./dist/js/vendor/jquery.js`
* Images
    * Place images for processing in `./src/images/`
    * Runs imagemin default optmization (change in `gulpfile.js`)
    * Outputs to `./dist/images/`

## Working File Layout

```
./
 └ dist/         # distribution folder
    └ css/      
    └ images/   
    └ js/
        └ scripts.js   # user scripts
        └ vendor/
            └ libs.js      # bower components
            └ jquery.js    # from bower
            └ plugins.js   # from /src/plugins/ directory
            └ modernizr.js # custom modernizr       
 └ src/          # working folder
    └ images/   # images to be optimized
    └ js/
        └ scripts.js   # use this for custom scripts
        └ plugins/     # use for non-Bower-managed libraries
    └ scss/
        └ main.scss    # use this to include partials
        └ base/        
            └ _breakpoint-query.scss
            └ _buttons.scss
            └ _normalize.scss
            └ _scaffolding.scss
            └ _typography.scss
            └ _variables.scss
        └ modules/      # use to style individual modules
        └ vendor/       # use to include vendor module styles
     └ templates/      # use for HTML/Nunjucks templates
        └ _base.njk   # base template
        └ index.njk   # index.html, extends _base.njk
```

## Saving New Components

Use the following commands to keep your `bower.json` and `package.json` files up-to-date. When you clone the repo to a new directory or machine, just run the `npm install` and `bower install` commands.

* Save new Bower libraries with `bower install <package> --save`
    * Remove Bower libraries with `bower uninstall <package> --save`
* Save new Gulp plugins or NodeJS modules with `npm i -D <package>`
    * Remove Gulp plugins or NodeJS modules with `npm r -D <package>`


## Thanks and Credits

Inspired by:

* https://github.com/gjhead/Starter-Files-Grunt

## MIT

Released under an [MIT license](https://github.com/josh-clarke/nunjucks-web-starter-files/blob/master/LICENSE).
