#!/usr/bin/env node
var port = process.env.PORT || 8080;
require('./app').listen( parseInt(port));
