# Nunjucks Web Starter Files

## New Features in v3.0+
* **Gulp 4 (alpha) with an ES6 Babel gulpfile**
* **Config file for paths `gulp-config.js`**
* **Uses Yarn instead of Bower+NPM**
* **Uses `gulp-include` directives to bundle all scripts**
* **Relies on binaries from the local project's `./node_modules/bin` instead of globals (except Yarn)**

These starter files can be used to generate a prototype or flat-file website. The Nunjucks template language is used for the HTML due to its close relationship to Twig.

After using this starter kit to build flat HTML prototypes, the Nunjucks files can then be re-used as a starter point for Twig-based templates such as [Wordpress with Timber](https://wordpress.org/plugins/timber-library/) or [Craft CMS](https://craftcms.com), and any platforms which can use Nunjucks or Jinja.

![Open Issues](https://img.shields.io/github/issues/josh-clarke/nunjucks-web-starter-files.svg) ![Project Forks](https://img.shields.io/github/forks/josh-clarke/nunjucks-web-starter-files.svg) ![GitHub Stars](https://img.shields.io/github/stars/josh-clarke/nunjucks-web-starter-files.svg) ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Requirements:

* [NodeJS](https://nodejs.org)
* [Yarn](https://yarnpkg.org)
  * MacOS: `brew install yarn`
  * Windows: [Get Installer](https://yarnpkg.com/latest.msi)
  * Linux: [Instructions](https://yarnpkg.com/en/docs/install#linux-tab)
* [Gulp4](https://github.com/gulpjs/gulp#4.0)

## Getting Started

1. Fork and clone repository or download the ZIP file
3. From the terminal inside the project folder, run `yarn`
4. Run `gulp` to build and watch for changes
    * Launches web server with BrowserSync at http://localhost:3000

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
* Automatically includes and concatenates using [`gulp-include`](https://www.npmjs.com/package/gulp-include)
    * jQuery included by default
    * IE Object Fit polyfill included
    * Console log error prevention script included

**JavaScript files are included using `//=require` or `//=include` directives within the script file:**

```JavaScript
//=require plugins/prevent-console-errors.js
//=require ../../../node_modules/jquery/dist/jquery.js
```

* Compresses JS files with [Uglify](https://www.npmjs.com/package/gulp-uglify)
* No linger—add your own if needed
* [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) is available but not configured for JavaScript

### Images
* Images placed in `./src/assets/images/` are optimized by default with [imagemin](https://github.com/sindresorhus/gulp-imagemin)
  * Place directly in `./dist/assets/images/` if optimization is not needed or undesired


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

You can also include partials with a simple include line:

```nunjucks
<header>
  {% include "_partials/_hero-slider.njk" %}
</header>
```

_For more advanced techniques, check out the [Nunjucks templating documentation](https://mozilla.github.io/nunjucks/templating.html)._

# Default Setup

By default, the following setup is used:

* Working and Production directories
    * `./src/` - Working directory
    * `./dist/` - Production directory
        * This directory and its subfolders will not be created until the first `gulp` build command
* Gulp
    * `gulp` command for default build with BrowserSync preview, also starts watching files
      * Launches web server with LiveReload at http://localhost:3000
    * `gulp watch` command to watch files for changes
* HTML/Nunjucks
    * Build templates in `./src/templates/` using either the `.njk`, `.nunjucks`, `.njk.html` or `.html` extension
    * Name partials and base extends with a leading underscore `_`
    * Builds to `./dist/`
* CSS/SASS
    * Write SCSS or SASS in `./src/assets/sass/`
      * `main.scss` - Import all partials in here
      * `base/` - Base styles
      * `modules/` - Per module styles
      * `vendor/` - Vendor module styles
    * Name partials with a leading underscore `_`
    * Concatenates to `./dist/assets/css/main.css`
    * **Note:** Use `yarn add <module> --dev` to maintain SASS libraries and link to them directly
      * Example: `@import '../../../node_modules/modularscale-sass/stylesheets/modularscale';`
* JS
    * User script file in `./src/assets/js/scripts.js` uses gulp-include directives to set bundle order of additional scripts
    * Place additional scripts in `plugins/`
    * **Note:** Use `yarn add <module> --dev` to maintain JS libraries and link to them directly
      * Example: `//require= ../../../node_modules/jquery/dist/jquery.js`
* Images
    * Place images for processing in `./src/assets/images/`
    * Runs imagemin default optimization (change in `gulpfile.babel.js`)
    * Outputs to `./dist/assets/images/`

## Working File Layout

```
./
 └ dist/         # distribution folder
    └ assets
      └ css/      
      └ images/   
      └ js/
          └ scripts.js   # bundled scripts
 └ src/          # working folder
    └ assets
      └ images/   # images to be optimized
      └ js/
          └ scripts.js   # use this for custom scripts
          └ plugins/     # use for non-package.json scripts
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

Use the following commands to add modules or libraries to `package.json`. When you clone the repo to a new directory or machine, just run the `yarn add` command. Yarn uses the same repositories as `npm`, and locks the version.

* New project modules/libraries can be added with `yarn add <package-name>`
* New build modules/libraries (such as gulp plugins) can be added with `yarn add <package-name> --dev`
* If you want to shift all packages to their latest versions, you can do `yarn upgrade`. **Do not do this unless you know what you are doing, as it could break your project.**


## Thanks and Credits

Inspired by:

* https://github.com/jh3y/gulp-boilerplate
* https://github.com/gjhead/Starter-Files-Grunt

## MIT

Released under an [MIT license](https://github.com/josh-clarke/nunjucks-web-starter-files/blob/master/LICENSE).
