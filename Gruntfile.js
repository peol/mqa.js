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
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: ".",
					name: "lib/mqa.js",
					out: "dist/mqa.min.js",
					pragmas: {
						"logFunction": true
					},
					onBuildRead: function(moduleName, path, contents) {
						var out = contents.replace(/^\s*log\(.+\);$/gm, "");
						return out;
					}
				}
			}
		}
});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks("grunt-mocha");

	grunt.registerTask("test", "mocha");
	grunt.registerTask("default", ["jshint", "test", "requirejs"]);
};