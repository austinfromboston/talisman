var vows = require('vows'),
    assert = require('assert'),
    Visitor = require('../js-visitor');

vows.describe('visiting a page').addBatch({
  'when the page has loaded': {
    topic: function() { 
      var topic = this;
      var agent = new Visitor().visit('http://www.amazon.com');
      agent.on('load', function(page) { topic.callback(null, page); });
    },
    'we get the right text': function(err, topic) {
      assert.equal( topic.body.match(/Kindle/)[0], 'Kindle' );
    },
    'not the wrong text': function(err, topic) {
      assert.equal( topic.body.match(/Kindling/), null );
    },
    'we get a jquery':function(err, topic) {
      assert.equal( typeof topic.window.jQuery, 'function' );
    },
    'we get selectors': function(err, topic) {
      assert.equal( topic.body.match(/SponsoredLinksGateway/)[0], 'SponsoredLinksGateway' );
      console.log( topic.window.jQuery('body').html() );
      assert.equal( topic.window.jQuery('#SponsoredLinksGateway', topic.body).length, 1);
    }
  }
}).export(module);
