var url = require('url');
var redis = require('then-redis');

// @see https://github.com/mjackson/then-redis#usage
module.exports = redis.createClient({
    host: process.env.REDIS_PORT_6379_TCP_ADDR,
    port: process.env.REDIS_PORT_6379_TCP_PORT
    // password: 'password'
});