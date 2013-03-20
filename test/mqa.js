/*global describe, it, expect, mqa*/
(function() {
	var iframe = document.createElement("iframe");

	function setSize(w, h) {
		iframe.setAttribute("width", w);
		iframe.setAttribute("height", h);
	}

	function resetSize() {
		setSize(400, 300);
	}

	iframe.onload = function() {
		var mqa = iframe.contentWindow.mqa;
		describe("Parsing", function() {
			it("should parse all media queries with aliases (see test.css)", function() {
				expect(Object.keys(mqa.queries).length).to.be(3);
				expect(mqa.queries.landscape).to.be("(orientation: landscape)");
				expect(mqa.queries.maxwidth).to.be("(max-width: 300px)");
				expect(mqa.queries.third).to.be("all");
			});
			it("should be able to test for a media query's state", function() {
				mqa.add("state", "(max-width: " + window.innerWidth + "px)");
				expect(mqa.match("state")).to.be(true);
			});
		});

		describe("Events", function() {
			it("should bind an event when an alias exist", function(done) {
				function callback(activated) {
					if (activated) {
						mqa.off("maxwidth", callback);
						done();
					}
				}
				mqa.on("maxwidth", callback);
				setSize(250, 100);
			});
			it("should throw an error when binding an event and the alias doesn't exist", function() {
				function trigger() {
					mqa.on("nonexisting", function(){});
				}
				expect(trigger).to.throwError();
			});
			it("should unbind a handler", function(done) {
				function handler() {
					done(new Error("The handler was called, shouldn't happen."));
				}
				function callback(activated) {
					if (activated) {
						done();
					}
				}
				mqa.on("maxwidth", handler);
				mqa.on("maxwidth", callback);
				mqa.off("maxwidth", handler);
				setSize(250, 100);
			});
		});

		describe("Handling Media Queries", function() {
			it("should be able to add a new aliased media query", function() {
				mqa.add("hello", "(min-width: 300px)");
				expect(mqa.queries.hello).to.be("(min-width: 300px)");
			});
			it("should throw an error if the alias already exist", function() {
				function trigger() {
					mqa.add("hello", "");
				}
				expect(trigger).to.throwError();
			});
			it("should return true if removal was successful", function() {
				expect(mqa.remove("hello")).to.be(true);
			});
			it("should return false if removal was unsuccessful", function() {
				expect(mqa.remove("hello")).to.be(false);
			});
		});

		beforeEach(function() {
			resetSize();
		})

		mocha.run();
	};
	resetSize();
	iframe.src = "iframe.html";
	document.body.appendChild(iframe);
}());
