#!/usr/bin/env node

var KeyCDN = require('../');

if (!process.env.APIKEY) {
    usage();
}

/***
 * Validate days argument
 */
var report = '';
if (process.argv[2]) {
    var days = process.argv[2].trim();
    if (!isNaN(days)) {
        var report = {
            start: (Math.floor(Date.now() / 1000)-3600*days),
            end: Math.floor(Date.now() / 1000)
        };
    }
}

var keycdn = new KeyCDN(process.env.APIKEY);

/***
 * Wrap keycdn.get to abstract generic error handling.
 */
function get(url, report, callback) {
    keycdn.get(url, report, function(error, result) {

        /***
         * Error handling.
         */
        if (error) {
            console.trace(error);
            process.exit(1);
        }

        /***
         * Callback on success.
         */
        callback(result.data);

    });
}

/***
 * Get traffic stats
 */
get('reports/traffic.json', report, function(traffic) {

    /***
     * Iterate through credits
     */
    traffic.stats.forEach(function(stat) {
        console.dir(stat);
    });
});

/***
 * Get credit stats
 */
get('reports/credits.json', report, function(credits) {

    /***
     * Iterate through credits
     */
    credits.stats.forEach(function(credit) {
        console.dir(credit);
    });
});

/***
 * Usage
 */
function usage() {
    console.log('');
    console.log('Usage: report.js [days]');
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
