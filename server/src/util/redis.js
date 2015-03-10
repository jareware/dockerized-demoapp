var url = require('url');
var redis = require('then-redis');

// @see https://github.com/mjackson/then-redis#usage
module.exports = redis.createClient({
    host: 'localhost',
    port: 6379
    // password: 'password'
});