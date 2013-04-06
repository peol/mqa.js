/*global module*/
module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: [
				"lib/*.js",
				"test/*.js",
				"*.js"
			],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		mocha: {
			all: {
				src: ["test/index.html"],
				options: {
					mocha: {
						ui: "tdd"
					},
					ignoreLeaks: false
				}
			}
		},
		watch: {
			scripts: {
				files: "<%= jshint.all %>",
				tasks: ["jshint", "test"]
			}
		},
		connect: {
			server: {
				options: {
					port: 9001
				}
			}
		}
});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks("grunt-mocha");

	grunt.registerTask("test", "mocha");
	grunt.registerTask("default", ["jshint", "test"]);
};