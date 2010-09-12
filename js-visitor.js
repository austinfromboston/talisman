var EventEmitter = require('events').EventEmitter,
    request = require('request'),
    jsdom = require('jsdom');

var Visitor = function() {
  var self = this;
  self.visit = function(url) {
    request({uri:url}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var window = jsdom.jsdom().createWindow(body);
        jsdom.jQueryify(window, __dirname + '/vendor/jquery.js', function (window, jquery) {
          self.emit('load', { body: body, response: response, window: window, '$':window.jQuery } ); 
        });
      }
    });
    return self;
  };
  return self;

};

Visitor.prototype = new EventEmitter;
module.exports = Visitor;
