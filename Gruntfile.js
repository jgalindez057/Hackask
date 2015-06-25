// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['public'],
          livereload: true
        }
      }
    },
 
    watch: {
      html: {
        files: 'html/**/*.html',
        options: {
          livereload: true
        }
      }
    },
 
  });
 
  // Creates the `server` task
  grunt.registerTask('server', [
    'express',
    'watch'
  ]);
};