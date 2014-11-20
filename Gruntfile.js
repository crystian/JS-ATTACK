/**
 * Created by Crystian on 11/20/2014.
 */

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: ['www/*.js','!www/ace/**/*'],
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		connect:{
			options: {
				port: 9000,
				logger: 'dev',
				hostname: '10.0.1.2',
				base: '.'
			},
			serve: {
				options: {
					livereload: false,
					keepalive: true,
					open: 'http://10.0.1.2:9000/www'
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

	grunt.registerTask('serve', ['connect:serve']);

};