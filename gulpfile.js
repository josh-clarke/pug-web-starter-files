var gulp = require("gulp");

// Include plugins
// Removes gulp- and gulp. prefixes
var p = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

// Path Variables
var src = "src/";   // working files
var dest = "dist/"; // production files

// Copy unmodified root files
gulp.task('copy', function(){
  gulp.src([
      src + '*',
      "!" + src + '*.{gif,png,ico,txt}',
      src + '*.{gif,png,ico,txt}'],
      {
        dot: true  // Include hidden, i.e., .htaccess
    }).pipe(gulp.dest(dest));
});

// Compile nunjucks templates
gulp.task('nunjucks', function() {
  gulp.src(src + 'templates/**/*.+(html|njk|nunjucks)')
    .pipe(p.nunjucks.compile( /* Optional data object here */ ))
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
    .pipe(p.sass({outputStyle: 'compressed'}))
			.on('error', console.log)
    .pipe(p.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
			.on('error', console.log)
    .pipe(gulp.dest(dest + 'css'))
    .pipe(p.connect.reload())
});

// JavaScript
gulp.task('scripts', function() {

  // JQuery
  gulp.src(src + 'js/vendor/jquery.js')
    .pipe(p.uglify())
    .pipe(gulp.dest(dest + 'js/vendor'))
    .pipe(p.connect.reload())

  // Bower Vendor Libraries
  gulp.src('./bower.json')
    .pipe(p.mainBowerFiles())
  	.pipe(p.filter('**/*.js'))
    // .pipe(p.order([
  	// 		'jquery.min.js',  // JQuery First
  	// 		'*'
  	// 	]))
    .pipe(p.uglify())
    .pipe(p.concat('libs.js'))
  	.pipe(gulp.dest(dest + 'js/vendor'));

  // JS Plugins
  gulp.src(src + 'js/plugins/*.js')
    .pipe(p.uglify())
    .pipe(p.concat('plugins.js'))
    .pipe(gulp.dest(dest + 'js/vendor'))
    .pipe(p.connect.reload())

  // Custom JS
  gulp.src(src + 'js/*.js')
    .pipe(p.uglify())
    .pipe(p.concat('scripts.js'))
    .pipe(gulp.dest(dest + 'js'))
    .pipe(p.connect.reload())

});

// Add needed Modernizr features
gulp.task('modernizr', function() {
  gulp.src([
      dest + 'js/vendor/*.js'
    ]).pipe(p.modernizr())
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

gulp.task('default', ['copy','nunjucks','images','sass','scripts','modernizr','connect','watch']);
