#!/usr/bin/env node

var KeyCDN = require('../');

if (!process.env.APIKEY) {
    usage();
}

var keycdn = new KeyCDN(process.env.APIKEY);

/***
 * Set zoneId
 */
var zoneId = 1234;

/***
 * Define URLs to be purged
 */
var purgeurl = {
    urls: [ 'demo-1.kxcdn.com/lorem.css', 'demo-1.kxcdn.com/lorem.jpg' ]
};

/***
 * Purge single or multiple URLs
 */
keycdn.del('zones/purgeurl/' + zoneId + '.json', purgeurl , function(err, res) {
    console.log('DEL zones/purgeurl/' + zoneId + '.json');
    if (err) {
        // error handling
        console.trace(err);
    } else {
        // print results
        console.dir(res);
    }
});

/***
 * Purge cache of complete zone
 */
keycdn.get('zones/purge/' + zoneId + '.json', function(err, res) {
    console.log('GET zones/purge/' + zoneId + '.json');
    if (err) {
        // error handling
        console.trace(err);
    } else {
        // print results
        console.dir(res);
    }
});

/***
 * Usage
 */
function usage() {
    console.log('');
    console.log('Usage: cache.js');
    console.log('');
    console.log('  Credentials:');
    console.log('');
    console.log('  Add your API key to your environment, like this:');
    console.log('');
    console.log('  $ export APIKEY=your_api_key');
    console.log('  $ ./cache.js');
    console.log('');
    console.log('  Or by passing them to the script.');
    console.log('');
    console.log('  $ APIKEY=your_api_key ./cache.js');
    console.log('');
    process.exit();
}
