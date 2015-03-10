var express = require('express');
var bodyParser = require('body-parser');
var guestbookApi = require('./api/guestbook');
var app = express();

// @see http://expressjs.com/guide/routing.html
app.route('/api/guestbook')
    .get(function(req, res) {
        console.log('Getting messages');
        guestbookApi.getMessages()
            .then(function(messages) {
                res.json(messages);
            })
            .catch(function(err) {
                res.status(500).json({ error: err + '' });
            });
    })
    .post(bodyParser.text(), function(req, res) {
        console.log('Posting message: ' + JSON.stringify(req.body));
        guestbookApi.postMessage(req.body)
            .then(function() {
                res.sendStatus(200);
            })
            .catch(function(err) {
                res.status(500).json({ error: err + '' });
            });
    });

// @see http://expressjs.com/starter/static-files.html
app.use(express.static(__dirname + '/../static'));

// @see http://expressjs.com/starter/hello-world.html
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('demoapp listening at http://%s:%s', host, port)
});