'use strict'

import gulp from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import cache from 'gulp-cache'
import del from 'del'
import imagemin from 'gulp-imagemin'
import include from 'gulp-include'
import nunjucks from 'gulp-nunjucks'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import size from 'gulp-size'
import sourcemaps from 'gulp-sourcemaps'
import order from 'gulp-order'
import uglify from 'gulp-uglify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import util from 'gulp-util'
import browserSync from 'browser-sync'
import { paths } from './gulp-config.js'

const sync = browserSync.create();

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
          .on('error', util.log)
    .pipe(sourcemaps.write(`.`))
    .pipe(gulp.dest(`${paths.out}/${paths.assets}/js`))
}

/**
 * Process SASS styles.
 */
function styles() {
	return gulp.src(`${paths.src}/${paths.assets}/sass/**/*.+(scss|sass)`)
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sass({outputStyle: 'compressed'}))
				.on('error',util.log)
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
				.on('error', util.log)
		.pipe(sourcemaps.write(`.`))
		.pipe(gulp.dest(`${paths.out}/${paths.assets}/css`))
		.pipe(sync.stream())
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
	return gulp.src(`${paths.src}/${paths.templates}/**/[^_]*.+(html|njk|njk.html|nunjucks)`)
    .pipe(nunjucks.compile( /* Optional data object here */ ))
    .pipe(rename({'extname':'.html'}))
    .pipe(gulp.dest(`${paths.out}`))
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
 * Clean Markup
 */
function clean() {
	return del([
		`${paths.out}/*.html`
	])
}

/**
 * Watch for changes to source files
 */
function watch() {
	gulp.watch(`${paths.src}/${paths.assets}/sass/**/*.+(scss|sass)`, styles)
  gulp.watch(`${paths.src}/${paths.assets}/js/**/*.js`, scripts)
	gulp.watch(`${paths.src}/${paths.assets}/images/**/*.(png|jpg|jpeg|gif)`, images)
  gulp.watch(`${paths.src}/${paths.templates}/**/*.+(html|njk|njk.html|nunjucks)`, templates)
}
