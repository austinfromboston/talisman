jasmine.locals = {
  execute: function() {
    jasmine.getEnv().execute();
  }
};

var localNames = [ 
  'spyOn', 'it', 'xit', 'expect', 'runs', 
  'waits', 'waitsFor', 'beforeEach', 'afterEach', 
  'describe', 'xdescribe', 'asyncDescribe' ];

for(i in localNames) {
  var name = localNames[i];
  jasmine.locals[name] = eval(name);
}


jasmine.JsApiReporter.prototype.finalReport = function() {
  var reporter = this;
  setTimeout( function() {
    var testResults = reporter.results();
    for (result in testResults ) {
      if (testResults[result].result == 'passed') {
        console.log('passed');
      } else {
        console.log(testResults[result]);
      }
    }
  }, 1000 );
};

jasmine

