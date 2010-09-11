var fs = require('fs'),
    filename = './vendor/jasmine.js',
    Script = process.binding('evals').Script;

var src = fs.readFileSync(filename) + fs.readFileSync('./jasmine-node-addons.js');
jasmine = Script.runInThisContext(src, 'jasmine-node-all.js');
module.exports = jasmine;

