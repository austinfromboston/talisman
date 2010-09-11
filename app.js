var jsdom = require('jsdom'),
    sys = require('sys'),
    request = require('request'),
    window = jsdom.jsdom().createWindow(),
    jasmine = require('./jasmine-node'),
    j = jasmine.locals;

jsdom.jQueryify(window, __dirname + '/vendor/jquery.js', function(window, jquery) {
  window.jQuery('body').append("<div class='testing'>Hello World</div>");
  sys.puts(window.jQuery(".testing").text());
});

var httpAgent = require('http-agent');

var agent = httpAgent.create('www.google.com', ['finance', 'news', 'images']);

agent.addListener('next', function (e, agent) {
  var window = jsdom.createWindow(agent.body);
  jsdom.jQueryify(window, __dirname + '/vendor/jquery.js', function (window, jquery) {
    runSuite(window);
    agent.next();
  });
});

agent.addListener('stop', function (agent) {
  j.execute();
  reporter.finalReport();
  sys.puts('the agent has stopped');
});

agent.start();

var reporter = new jasmine.JsApiReporter()
jasmine.getEnv().addReporter(reporter);

function runSuite(window) {
  var $ = window.jQuery;
  // jQuery is now loaded on the jsdom window created from 'agent.body'
  $('a').addClass('foo');
  console.log( 'a:', $('a').size(), '  foos:', $('.foo').size());

  j.describe('simple math', function() {
    j.it("should compute", function() {
      j.expect( $('a').size()).toEqual($('.foo').size());
    });
  });
}
