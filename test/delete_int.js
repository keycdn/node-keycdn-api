var test = require('tape');

var KeyCDN = require('../index');
var keycdn = new KeyCDN(process.env.APIKEY);

var zoneId = 1234;

test('delete', function(t) {
    keycdn.del('zones/' + zoneId + '.json', function(err, res) {
        t.error(err, 'delete w/o error');
        t.equal(res.status, 'success', 'delete successful');
    });

    t.end();
});
