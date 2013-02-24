/*global module*/
module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: [
				"lib/*.js"
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
					run: true,
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