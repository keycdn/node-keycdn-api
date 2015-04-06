var test = require('tape');

var KeyCDN = require('../index');
var keycdn = new KeyCDN(process.env.APIKEY);

test('post', function(t) {
    var zone = {
        name: 'node01',
        type: 'push'
    };
    keycdn.post('zones.json', zone, function(err, res) {
        t.error(err, 'post (js object) without error');
        t.ok(res.data.zone.id, 'post with response');
        console.log(res.data.zone.id);
    });

    t.end();
});
