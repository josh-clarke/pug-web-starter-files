'use strict'

import gulp from 'gulp'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import cache from 'gulp-cache'
import del from 'del'
import imagemin from 'gulp-imagemin'
import include from 'gulp-include'
import pug from 'gulp-pug'
//import rename from 'gulp-rename'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import size from 'gulp-size'
import sourcemaps from 'gulp-sourcemaps'
//import order from 'gulp-order'
import uglify from 'gulp-uglify'
import browserSync from 'browser-sync'
import { paths } from './gulp-config.js'

const sass = gulpSass(dartSass)
const sync = browserSync.create();

// Initiations
gulp.task('default', gulp.series(clean, gulp.parallel(scripts, styles, images, templates), gulp.parallel(serve, watch)))
gulp.task('watch', gulp.parallel(serve, watch))


/**
 * Process scripts file with gulp-include into one bundle.
 */
function scripts() {
  return gulp.src(`${paths.src}/${paths.assets}/js/scripts.js`)
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(include())
        .pipe(uglify())
    .pipe(sourcemaps.write(`.`))
    .pipe(gulp.dest(`${paths.out}/${paths.assets}/js`))
}

/**
 * Process SASS styles.
 */
function styles() {
  let processors = [
    autoprefixer,
    cssnano
  ];
	return gulp.src(`${paths.src}/${paths.assets}/sass/**/*.+(scss|sass)`)
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sass().on('error', sass.logError))        
			.pipe(postcss(processors))
		.pipe(sourcemaps.write(`.`))
		.pipe(gulp.dest(`${paths.out}/${paths.assets}/css`))
}

/**
 * Optimize and move images.
 */
function images() {
	return gulp.src(`${paths.src}/${paths.assets}/images/**/*.+(png|jpg|jpeg|gif|webp)`)
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(`${paths.out}/${paths.assets}/images`))
    .pipe(size({title: 'images'}))
}

/**
 * Process nunjucks templates
 */
function templates() {
	return gulp.src(`${paths.src}/${paths.templates}/**/[^_]*.+(pug|jade)`)
    .pipe(pug({
      verbose: true
    }))
    //.pipe(rename({'extname':'.html'}))
    .pipe(gulp.dest(`${paths.out}`))
}

/**
 * Clean built markup files
 */
function clean() {
	return del([
		`${paths.out}/*.html`
	])
}

/**
 * Start BrowserSync
 */
 function serve() {
	sync.init({
    server: {
        baseDir: `./${paths.out}`
    }
  });

	gulp.watch(`${paths.out}/${paths.assets}/js/**/*.js`, sync.reload)
	gulp.watch(`${paths.out}/${paths.assets}/images/**/*.(png|jpg|jpeg|gif|webp)`, sync.reload)
	gulp.watch(`${paths.out}/**/*.+(html)`, sync.reload)
}

/**
 * Watch for changes to source files
 */
 function watch() {
	gulp.watch(`${paths.src}/${paths.assets}/sass/**/*.+(scss|sass)`, styles)
  gulp.watch(`${paths.src}/${paths.assets}/js/**/*.js`, scripts)
	gulp.watch(`${paths.src}/${paths.assets}/images/**/*.(png|jpg|jpeg|gif)`, images)
  gulp.watch(`${paths.src}/${paths.templates}/**/*.+(pug|jade)`, templates)
}
