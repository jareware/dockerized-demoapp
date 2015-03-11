var express = require('express');
var bodyParser = require('body-parser');
var guestbookApi = require('./api/guestbook');
var app = express();

if (process.env.ENABLE_LIVERELOAD) {
    var fs = require('fs');
    var livereload = require('livereload');
    var index = fs.readFileSync(__dirname + '/../static/index.html') + '';
    var inject = fs.readFileSync(__dirname + '/../contrib/livereload-inject.html') + '';
    livereload
        .createServer({ interval: 100 }) // @see https://www.npmjs.com/package/livereload#api-options
        .watch(__dirname + '/../static'); // notify clients about changes to static files
    app.get('/', function(req, res) { // rewrite any requests to the app root to include the livereload snippet
        res.send(index.replace('</body>', inject + '</body>')); // append the snippet to the end of <body>
    });
}

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