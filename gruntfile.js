module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // this is a very, very , very simple templating engine.
    codekit: {

      dist: {
        src : 'src/kit/**/*.kit',
        dest : 'dist'
      }

    },

    sass: {

      dist: {
        options: {
          style: 'compressed' // compact, compressed, nested or expanded
        },
        files: {
          'src/.pre-css/main-pre.css' : 'src/sass/main.scss'
        }
      }

    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
	          browsers: 'last 2 versions'
	        })
        ]
      },

      dist: {
        src: 'src/.pre-css/main-pre.css',
        dest: 'dist/css/main.css'
      }
    },

    jshint: {
      beforeuglify: 'src/js/scripts.js'
    },

    uglify: {

      dist: {

        files: {
          'dist/js/vendor/jquery.js'    : 'src/js/vendor/jquery.js',
          'dist/js/vendor/modernizr.js' : 'src/js/vendor/modernizr-3.5.0.min.js',
          'dist/js/vendor/ofi.js'       : 'src/js/vendor/ofi.js',
          'dist/js/scripts.js'    : 'src/js/scripts.js',
          'dist/js/plugins.js'   : 'src/js/plugins/*.js'
        }

      }

    },

    // Watch options: what tasks to run when changes to files are saved
    watch: {
      options: {
        livereload: true
      },

      kit: {
        files: ['src/kit/**/*.kit'],
	    tasks: ['codekit']
      },

      sass: {
        files: ['src/sass/**/*.scss'],
        tasks: ['sass', 'postcss']
      },

     jstest: {
        files: ['src/js/script.js'],
        tasks: ['jshint']
      },

      jsmin: {
        files: ['src/js/**/*.js'], // Watch for changes in JS files except for script.min.js to avoid reload loops
        tasks: ['uglify']
      }
	}



  });

  grunt.loadNpmTasks('grunt-codekit');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', [/*'codekit',*/ 'sass', 'postcss', 'jshint', 'uglify', 'watch']);

  grunt.registerTask('css', ['sass', 'postcss']);
  grunt.registerTask('js', ['jshint', 'uglify']);

};
