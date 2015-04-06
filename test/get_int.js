var test = require('tape');

var KeyCDN = require('../index');
var keycdn = new KeyCDN(process.env.APIKEY);

test('get', function(t) {
    [ 'zones.json', 'zonealiases.json', 'zonereferrers.json' ]
    .forEach(function(endPoint) {

        keycdn.get(endPoint, '', function(err, res) {
            t.error(err, 'get '+endPoint+' without error');
            t.ok(res, 'get '+endPoint+' with data');
        });

    });

    var report = {
        start: (Math.floor(Date.now() / 1000)-3600*30),
        end: Math.floor(Date.now() / 1000)
    };

    keycdn.get("reports/credits.json", report, function(err, res) {
        t.error(err, 'get credits.json without error');
        t.ok(res, 'get credits.json with data');
    });

    t.end();
});
