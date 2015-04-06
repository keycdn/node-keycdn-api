var http  = require('http-debug').http;
var https = require('http-debug').https;

var test = require('tape');

var KeyCDN = require('../index');
var keycdn = new KeyCDN(process.env.APIKEY);

if (process.env.DEBUG) {
    http.debug = 2;
    https.debug = 2;
}

var zoneId = 1234;

test('delete', function(t) {
    keycdn.del('zones/' + zoneId + '.json', function(err, res) {
        t.error(err, 'delete w/o error');
        t.equal(res.status, 'success', 'delete successful');
    });

    t.end();
});
