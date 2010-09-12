jasmine = require( 'jasmine-node' );

for(key in jasmine.locals) {
  eval( key + " = jasmine.locals." + key + ";" );
}


