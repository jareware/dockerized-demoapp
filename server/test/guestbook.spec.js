var chai = require('chai');
var assert = chai.assert;

var db = require('../src/util/redis');
var guestbookApi = require('../src/api/guestbook');

describe('Guestbook API', function() {

    beforeEach(function() {
        // @see http://redis.io/commands/flushdb
        return db.flushdb();
    });

    it('adds messages', function() {
        return guestbookApi.postMessage('Hola Salsa!')
            .then(function() {
                return guestbookApi.getMessages();
            })
            .then(function(messages) {
                assert.deepEqual(messages, [ 'Hola Salsa!' ]);
            });
    });

});