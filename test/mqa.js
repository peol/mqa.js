/*global describe, it, expect, mocha, afterEach*/
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

			it("should return a media queries state", function() {
				mqa.add("state", "(max-width: " + window.innerWidth + "px)");
				expect(mqa.match("state")).to.be(true);
			});

			it("should refresh the cache", function() {
				iframe.contentDocument.querySelector("style").innerHTML = "@media all {#-mqa-alias-afterRefresh{}}";
				mqa.parse();
				expect(mqa.queries.afterRefresh).to.be("all");
			});
		});

		describe("Events", function() {
			it("should trigger a bound handler", function(done) {
				function callback(activated) {
					if (activated) {
						mqa.off("maxwidth", callback);
						done();
					}
				}
				mqa.on("maxwidth", callback);
				setSize(250, 100);
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

			it("should return true if removal was successful", function() {
				expect(mqa.remove("hello")).to.be(true);
			});

			it("should return false if removal was unsuccessful", function() {
				expect(mqa.remove("hello")).to.be(false);
			});
		});

		afterEach( resetSize );

		mocha.run();
	};

	resetSize();
	iframe.src = "iframe.html";
	document.body.appendChild(iframe);
}());