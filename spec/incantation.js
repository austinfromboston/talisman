var Visitor = require('../js-visitor');
var jasmine = require( '../jasmine-node' );

for(key in jasmine.locals) {
  eval( key + " = jasmine.locals." + key + ";" );
}


describe('a visit to Amazon.com', function() {
  var agent;
  beforeEach(function() {
    agent = new Visitor().visit('http://www.amazon.com');
  });
  it("should show an ad for kindle", function() {
    var loaded_page = false;
    var pageLoad = function() {
      return loaded_page;
    };
    waitsFor(pageLoad);
    agent.on('load', function(page) {
      loaded_page = true;
      runs( function() {
        expect(page.body).toMatch(/Kindle/);
      });
    });
  });
  it("should highlight some books", function() {
    agent.on('load', function(page) {
      expect(page.body).toMatch("Books For You Moo");
    });
  });
  xdescribe("when i visit a book page", function() {
    beforeEach(function() {
      agent.on('load', function(page) {
        page.click_link("Book");
      });
    });
    it("should show the checkout button", function() {
      agent.on('load', function() {
        expect(selector('.checkout:visible')).toExist();
      });
    });
    it("should show current reviews", function() {
      agent.on('load', function() {
        expect(selector('.reviews li').length).toBeGreaterThan(1);
      });
    });
    it("should allow me to review the item");
    describe("when i review an item", function() {
      it("should require me to log in")
      describe("when i have logged in", function() {
        it("should allow me to select a score")
        it("should allow me to write a review")
        it("should allow me to submit the form")
        describe("when i have submitted the form", function() {
          it("should display the 'saving your review' message")
        });
      });
    });
  });
});
