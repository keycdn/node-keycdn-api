#!/usr/bin/env node

var KeyCDN = require('../');

if (!process.env.APIKEY) {
    usage();
}

var keycdn = new KeyCDN(process.env.APIKEY);

/***
 * Get all zones
 */
keycdn.get('zones.json', function(err, res) {
    console.log('GET zones.json')
    if (err) {
        // error handling
        console.trace(err);
    } else {
        // print results
        console.dir(res.data);
    }
});


/***
 * Get a single zone
 */
keycdn.get('zones/<zoneId>.json', function(err, res) {
    console.log('GET zones/<zoneId>.json');
    if (err) {
        // error handling
        console.trace(err);
    } else {
        // print results
        console.dir(res.data);
    }
});

/***
 * Usage
 */
function usage() {
    console.log('');
    console.log('Usage: simple.js');
    console.log('');
    console.log('  Credentials:');
    console.log('');
    console.log('  Add your API key to your environment, like this:');
    console.log('');
    console.log('  $ export APIKEY=your_api_key');
    console.log('  $ ./report.js');
    console.log('');
    console.log('  Or directly pass them to the script.');
    console.log('');
    console.log('  $ APIKEY=your_api_key ./report.js');
    console.log('');
    process.exit();
}
