/*global module*/
module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: [
				"lib/*.js",
				"test/*.js"
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
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-mocha");

	grunt.registerTask("test", "mocha");
	grunt.registerTask("default", ["jshint", "test"]);
};