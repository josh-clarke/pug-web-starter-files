var gulp = require("gulp");

// Include plugins
// Removes gulp- and gulp. prefixes
var p = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});
p.mainBowerFiles = require("main-bower-files");

// Path Variables
var src = "./src/";   // working files
var dest = "./dist/"; // production files

// Kept for reference, but recommend adding unmodified files straight to dest
// // Copy unmodified root files
// gulp.task('copy', function(){
//   gulp.src([
//       src + '*',
//       "!" + src + '*.{gif,png,ico,txt}',
//       src + '*.{gif,png,ico,txt}'],
//       {
//         dot: true  // Include hidden, i.e., .htaccess
//     }).pipe(gulp.dest(dest));
// });

// Compile nunjucks templates
// Ignores files that start with _ (for partials or extend tempalates)
gulp.task('nunjucks', function() {
  gulp.src(src + 'templates/**/[^_]*.+(html|njk|nunjucks)')
    .pipe(p.nunjucks.compile( /* Optional data object here */ ))
    .pipe(p.rename({'extname':'.html'}))
    .pipe(gulp.dest(dest))
    .pipe(p.connect.reload());
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src(src + 'images/**/*.+(png|jpg|jpeg|gif)')
    .pipe(p.cache(p.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(dest + 'images'))
    .pipe(p.size({title: 'images'}))
		.pipe(p.connect.reload());
});

// CSS SASS Preprocessing
// + Autoprefixer Postprocessing
gulp.task('sass', function() {
  gulp.src(src + 'sass/**/*.+(scss|sass)')
    //.pipe(p.sourcemaps.init())         // ******* UNCOMMENT FOR SOURCEMAPS
      .pipe(p.sass({outputStyle: 'compressed'}))
  			.on('error', console.log)
      .pipe(p.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
  			.on('error', console.log)
    //.pipe(p.sourcemaps.write('.'))     // ******* UNCOMMENT FOR SOURCEMAPS
    .pipe(gulp.dest(dest + 'css'))
    .pipe(p.connect.reload())
});

// JavaScript
gulp.task('scripts', function() {

  // JQuery
  gulp.src(src + 'bower_components/jquery/dist/jquery.js')
    .pipe(p.uglify())
    .pipe(gulp.dest(dest + 'js/vendor'))

  // Bower Vendor Libraries
  gulp.src(p.mainBowerFiles({debugging:true}), {base:'bower_components'})
    .pipe(p.filter('**/*.js', { restore: true }))
    .pipe(p.uglify())
    .pipe(p.concat('libs.js'))
  	.pipe(gulp.dest(dest + 'js/vendor'))

  // JS Plugins
  gulp.src(src + 'js/plugins/*.js')
    .pipe(p.uglify())
    .pipe(p.concat('plugins.js'))
    .pipe(gulp.dest(dest + 'js/vendor'))

  // Custom JS
  gulp.src(src + 'js/*.js')
    .pipe(p.sourcemaps.init())
      .pipe(p.uglify())
      .pipe(p.concat('scripts.js'))
    .pipe(p.sourcemaps.write('.'))
    .pipe(gulp.dest(dest + 'js'))
    .pipe(p.connect.reload())

});

// Add needed Modernizr features
gulp.task('modernizr', function() {
  gulp.src(src + 'js/vendor/*.js')
    .pipe(p.modernizr())
    .pipe(gulp.dest(dest + 'js'))
});

// Live Server
gulp.task('connect', function() {
  p.connect.server({
    root: dest,
    livereload: true
  })
});

// Run Tasks

gulp.task('watch', function(){
  gulp.watch(src + 'sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch(src + 'templates/**/*.+(html|njk|nunjucks)', ['nunjucks']);
  gulp.watch(src + 'images/**/*.(png|jpg|jpeg|gif)', ['images']);
  gulp.watch(src + 'js/**/*.js', ['scripts']);
});

gulp.task('default', ['nunjucks','images','sass','scripts','modernizr','connect','watch']);
