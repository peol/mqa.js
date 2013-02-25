/*global describe, it, expect, mqa*/
describe("Parsing", function() {
	it("should parse all media queries with aliases (see test.css)", function() {
		expect(Object.keys(mqa.queries).length).to.be(3);
		expect(mqa.queries.landscape).to.be("(orientation: landscape)");
		expect(mqa.queries.maxwidth).to.be("(max-width: 1024px)");
		expect(mqa.queries.third).to.be("all");
	});
	it("should be able to test for a media query's state", function() {
		mqa.add("state", "(max-width: " + window.innerWidth + "px)");
		expect(mqa.match("state")).to.be(true);
	});
});

describe("Events", function() {
	it("should bind an event when an alias exist", function() {
		mqa.on("landscape", function(){});
		// resize phantom.js viewport here to trigger the media query
	});
	it("should throw an error when binding an event and the alias doesn't exist", function() {
		function trigger() {
			mqa.on("nonexisting", function(){});
		}
		expect(trigger).to.throwError();
	});
	it("should unbind a handler", function() {
		function handler() {
			throw new Error("Handler called—shouldn't happen.");
		}
		mqa.on("landscape", handler);
		mqa.off("landscape", handler);
		// resize phantom.js viewport here to trigger the media query
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