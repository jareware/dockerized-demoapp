var db = require('../util/redis');

var GUESTBOOK_KEY = 'guestbook';

module.exports = {

    getMessages: function() {
        return db.lrange(GUESTBOOK_KEY, 0, -1);
    },

    postMessage: function(message) {
        return db.lpush(GUESTBOOK_KEY, message);
    }

};