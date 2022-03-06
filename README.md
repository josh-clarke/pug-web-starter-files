# Pug Web Starter Files


![Open Issues](https://img.shields.io/github/issues/josh-clarke/pug-web-starter-files.svg) ![Project Forks](https://img.shields.io/github/forks/josh-clarke/pug-web-starter-files.svg) ![GitHub Stars](https://img.shields.io/github/stars/josh-clarke/pug-web-starter-files.svg) ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

These starter files can be used to quickly develop a prototype or flat-file website. The [Pug](https://pugjs.org) template language is used for the HTML due to its terse structure and integration of JavaScript, and [Sass](https://sass-lang.com) is used for its flexibility and extended capabilities.

## Highlights
* **[Pug](https://pugjs.org/) template language (formerly Jade) with a nice terse syntax**
* **[Sass](https://sass-lang.com) for writing quick CSS**
* **[jQuery](https://jquery.com) 3.6 included**
* **[PostCSS](https://github.com/postcss/gulp-postcss) with the [Autoprefixer](https://github.com/postcss/autoprefixer) and [CSSNano](https://github.com/cssnano/cssnano) extensions**
* **[Gulp 4](https://gulpjs.com) with a Babel gulpfile for ES6 syntax**
* **Uses [Yarn](https://yarnpkg.org) for Node package management**
* **Relies on local `node_modules` instead of globals (except Yarn)**

## Requirements:

* [NodeJS](https://nodejs.org) LTS+
* [Yarn](https://yarnpkg.org)
  * MacOS: `brew install yarn`
  * Windows: [Get Installer](https://yarnpkg.com/latest.msi)
  * Linux: [Instructions](https://yarnpkg.com/en/docs/install#linux-tab)
* [Gulp 4](https://gulpjs.com/docs/en/getting-started/quick-start/)
  * (Optional) All platforms: `yarn global add gulp-cli` to build with `gulp`

## Quick Start

1. Fork and/or clone the repository or [download the ZIP file](https://github.com/josh-clarke/pug-web-starter-files/archive/refs/heads/master.zip)
    *  `git clone https://github.com/josh-clarke/pug-web-starter-files`
3. From the terminal inside the project folder, run `yarn` to install node modules
4. Run `yarn build` (or `gulp` if you have `gulp-cli` installed globally) to build and watch for changes
    * Launches web server with Browsersync at http://localhost:3000

## Detailed Features

### HTML

* [Pug](https://pugjs.org/) template language (formerly Jade)
  * Extend/Include templates, Scripting, Mixins, Interpolation and [more](https://pugjs.org/)
* Starter template based on [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)

### CSS

* [Sass](https://sass-lang.com) for writing CSS
  * Uses the official [Dart Sass](https://sass-lang.com/dart-sass) transcription engine
* Processes through [PostCSS](https://github.com/postcss/gulp-postcss) with the [Autoprefixer](https://github.com/postcss/autoprefixer) and [CSSNano](https://github.com/cssnano/cssnano) extensions
  * Uses the [Browserslist](https://github.com/browserslist/browserslist) config in `package.json` for Autoprefixer (uses `default` and `not IE 11`) 
* Includes [normalize.scss](https://github.com/JohnAlbin/normalize-scss) library
* Includes [modularscale-sass](https://github.com/modularscale/modularscale-sass) library
* Includes simple base styles and common global Sass variables
* Includes [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) to trace errors to the source Sass files

### JavaScript
* Automatically includes and concatenates using [`gulp-include`](https://www.npmjs.com/package/gulp-include)
* jQuery included by default
* IE Object Fit polyfill included
* Uses `gulp-include` directives to bundle all scripts into one (see below)
* Console log error prevention script included
* Includes [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) to trace errors to the source JS files

**JavaScript files can be included into other files using `//=require` or `//=include` directives within the script file:**

```JavaScript
//=require plugins/prevent-console-errors.js
//=require ../../../node_modules/jquery/dist/jquery.js
```

* Compresses JS files with [Uglify](https://www.npmjs.com/package/gulp-uglify)
* [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) is available but not configured for JavaScript
* No linter; add your own if needed

### Images
* Images placed in `./src/assets/images/` are optimized by default with [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
  * Place directly in `./dist/assets/images/` if optimization is not needed or undesired


## Templating

The best way to template with [Pug](https://pugjs.org/language/attributes.html), a HAML-like template language, is to extend from a base template. Base templates or partials may be prefixed with an underscore `_` to prevent them from compiling into their own standalone templates. For example:

**Base Template (Simplified): `_base.pug`**

```pug
doctype html
html
block vars
  - var title = 'Fallback Title'
head
  title #{title}
body
  block content
    p Fallback content.
```

**Extended Template: `index.pug`**

```pug
extends _base.pug

block vars
  - var title = 'Hello World'

block content
  h1 Hello World!
  p You've reached my site!
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

You can also include partials with like this:

```pug
header
  include _partials/_hero-slider.pug
```

_For more information, check out the [Pug templating documentation](https://pugjs.orig)._

## Default Setup

By default, the following setup is used:

* Working and Production directories (change in `gulp-config.js`)
    * `src` - Working directory
    * `dist` - Production directory (appears after first build)
        * This directory and its subfolders will not be created until the first `gulp` build command
    * `assets` - Assets directory for images, CSS, scripts
    * `templates` - Templates directory for Pug files
* Gulp
    * `yarn build` or [optional](#quick-start) `gulp` command for default build with BrowserSync preview and watch files for changes
      * Launches web server with BrowserSync at http://localhost:3000
* Pug Templates
    * Build templates in `./src/templates/` using either the `.pug`, or `.jade` extension
    * Name partials and base extends with a leading underscore `_`
    * Builds to `./dist/`
* CSS/Sass
    * Write Sass in `./src/assets/sass/`
      * `main.scss` - Import all sass partials in here
      * `base/` - Base styles
    * Name partials with a leading underscore `_`
    * Concatenates to `./dist/assets/css/main.css`
    * **Note:** Use `yarn add <module> --dev` to maintain Sass libraries and link to them directly
      * Example: `@import '../../../node_modules/modularscale-sass/stylesheets/modularscale';`
* JS
    * User script file in `./src/assets/js/scripts.js` uses gulp-include directives to set bundle order of additional scripts
    * Place additional scripts in `plugins/`
    * **Note:** Use `yarn add <module> --dev` to maintain JS libraries and link to them directly
      * Example: `//=require ../../../node_modules/jquery/dist/jquery.js`
* Images
    * Place images for processing in `./src/assets/images/`
    * Runs imagemin default optimization (change in `gulpfile.babel.js`)
    * Outputs to `./dist/assets/images/`

### Working File Layout

```
./
 └ dist/                # distribution folder (appears after first build)
    └ assets
      └ css/      
        └ main.css      # main CSS file
      └ images/   
      └ js/
          └ scripts.js  # bundled scripts
 └ src/                 # working folder
    └ assets
      └ images/         # images to be optimized
      └ js/
          └ scripts.js  # use this for custom scripts
          └ plugins/    # use for non-package.json scripts
      └ scss/
          └ main.scss   # use this to include partials
          └ base/        
              └ _breakpoint-query.scss
              └ _buttons.scss
              └ _normalize.scss
              └ _scaffolding.scss
              └ _typography.scss
              └ _variables.scss
     └ templates/       # use for Pug templates
        └ _base.pug     # base template
        └ index.pug     # index.html, extends _base.pug
```

## Miscellaneous

### Saving New Components

Use the following commands to add modules or libraries to `package.json`. When you clone the repo to a new directory or machine, just run the `yarn add` command.

* New **project** modules/libraries can be added with `yarn add <package-name>`
* New **build** modules/libraries (such as gulp plugins) can be added with `yarn add <package-name> --dev`

If you want to shift all packages to their latest versions, you can do `yarn upgrade`. **Do not do this unless you know what you are doing, as it could break your project.**


### End Notes

**Based on:**

* https://github.com/josh-clarke/nunjucks-web-starter-files

**Inspired by:**

* https://github.com/jh3y/gulp-boilerplate
* https://github.com/gjhead/Starter-Files-Grunt
* https://github.com/gjhead/Starter-Files-Gulp4

**License**

Released under an [MIT license](https://github.com/josh-clarke/pug-web-starter-files/blob/master/LICENSE).
