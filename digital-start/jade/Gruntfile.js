module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
            expand: true,
            cwd: 'source/views/',
            src: ['*.jade'],
            dest: 'public/',
            ext: '.html'
          }, {
            expand: false,
            cwd: 'source/views/blocks',
            src: ['*.jade'],
            dest: 'public/blocks',
            ext: '.html'
          }
        ]
      }
    },
    less: {
      build: {
        options: {
          compress: false
        },
        files: [{    
            'public/css/style.css': 'source/assets/css/style.less'
          }
        ]
      }
    },
    concat: {    
      libs: {
        src:  'source/assets/js/libs/jquery-2.1.1.min.js',
        dest: 'public/js/libs.js'
      },
      plugins: {
        src: ['source/assets/js/plugins/*.js', 'source/assets/js/plugins/*/*.js'],
        dest: 'public/js/plugins.js'
      },
      start: {
        src: 'source/assets/js/start.js',
        dest: 'public/js/start.js'
      }
    },
    copy: {
      ajax: {
        files: [{
            expand: true,
            cwd: 'source/views/ajax/',
            src: '*',
            dest: 'public/ajax/'
          }
        ]
      },
      robots: {
        files: [{
            expand: true,
            cwd: 'source/assets/robots/',
            src: '*',
            dest: 'public'
          }
        ]
      },
      images: {
        files: [{
            expand: true,
            cwd: 'source/assets/images/',
            src: '**/*',
            dest: 'public/images/'
          }
        ]
      },
      uploads: {
        files: [{
            expand: true,
            cwd: 'source/assets/uploads/',
            src: '**/*',
            dest: 'public/uploads/'
          }
        ]
      },
      fonts: {
        files: [{
            expand: true,
            cwd: 'source/assets/fonts/',
            src: '**/*',
            dest: 'public/fonts/'
          }
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['source/assets/js/plugins/plugin-*.js', 'source/assets/js/*.js']
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>', 'source/assets/js/plugins/*.js', 'source/assets/js/plugins/*/*.js'],
        tasks: ['concat']
      },
      jade: {
        files: ['source/views/**/*.jade'],
        tasks: ['jade']
      },
      less: {  
        files: ['source/assets/css/**/*.less'],
        tasks: ['less:build']
      },
      ajax: {
        files: ['source/views/ajax/**/*.*'],
        tasks: ['copy:ajax']
      },
      fonts: {
        files: ['source/assets/fonts/**/*'],
        tasks: ['copy:fonts']
      },
      images: {
        files: ['source/assets/images/**/*'],
        tasks: ['copy:images']
      },
      uploads: {
        files: ['source/assets/uploads/**/*'],
        tasks: ['copy:uploads']
      }
    },
    cssmin: {
      compress: {
        files: [{
            'public/css/style.css': 'public/css/style.css'
          }
        ]
      }
    },
    usemin: {
      // html: ['public/**/*.html'],
      css: ['public/css/**/*.css']
    },
    uglify: {
      options: {        
        compress: true,
        beautify: false,
        preserveComments: false
      },
      libs: {
        files: [{
            'public/js/libs.js': 'source/assets/js/libs/jquery-1.9.1.js'
          }
        ]
      },
      plugins: {
        files: [{
            'public/js/plugins.js': 'public/js/plugins.js'
          }
        ]
      }
    },
    clean: {
      build: ['public']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', ['clean:build', 'concat', 'less:build', 'jade', 'copy']);
  grunt.registerTask('build', 'default');
  // grunt.registerTask('release', ['build', 'uglify', 'cssmin', 'usemin']);
  grunt.registerTask('deploy', ['build', 'uglify' ]);

};