var chokidar = require('watchify/node_modules/chokidar');
var origWatch = chokidar.watch;

// Monkey-patch chokidar.watch() to use polling:
// @see https://github.com/substack/watchify/blob/2.4.0/index.js#L83
// @see https://github.com/substack/watchify/blob/2.4.0/index.js#L98
chokidar.watch = function(file, opts) {
    // @see https://github.com/paulmillr/chokidar#performance
    opts.usePolling = true;
    return origWatch.call(chokidar, file, opts);
};

// Proxy to the actual watchify "binary":
require('watchify/bin/cmd');