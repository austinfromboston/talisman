// NOTE:
// When testing this demo you need to ensure that the domain you're hosting
// it on is in the network section of the cache manifest (second argument)
// or the long-poll may not work.

var Connect = require('./vendor/connect');
var root = __dirname + "/public";

var Backend = require('./broadcaster');

// Create a server with no initial setup
var Server = module.exports = Connect.createServer();

// Add global filters
Server.use("/",
    Connect.responseTime(),
    Connect.logger()
);

// Serve dynamic responses
Server.use("/stream",
    Connect.bodyDecoder(),
    Connect.pubsub(Backend)
);

// Serve static resources
Server.use("/",
    Connect.cacheManifest(root, ["http://localhost:3000/", "http://localhost:8080", "http://stackattack.heroku.com/"]),
    Connect.conditionalGet(),
    Connect.cache(),
    Connect.gzip(),
    Connect.staticProvider(root)
);
