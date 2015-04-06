# node-keycdn-api

KeyCDN API for Node.js

## Install

```
$ npm install keycdn
```

## Usage

#### Initialize

```
var KeyCDN = require('keycdn');
var keycdn = new KeyCDN('your_api_key');
```

#### `keycdn.get`

```
// get all zones
keycdn.get('zones.json', function(err, results) {
    if (err) {
        console.trace(err);
        return;
    }
    console.dir(results);
});

// purge zone cache
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
```

#### `keycdn.put`

```
var zone = {
    name: 'node01',
    expire: 1440
};
keycdn.put('zones/<zoneId>.json', zone, function(err, res) {
    if (err) {
        console.trace(err);
        return;
    }
    console.dir(res);
});
```

#### `keycdn.post`

```
var zone = {
    name: 'node01',
    type: 'push'
};
keycdn.post('zones.json', zone, function(err, res) {
    if (err) {
        console.trace(err);
        return;
    }
    console.dir(res);
});
```

#### `keycdn.del`

```
var zoneId = '1234';

// delete zone
keycdn.del('zones/' + zoneId + '.json', function(err, res) {
    if (err) {
        console.trace(err);
        return;
    }
    if (res.status === 'success') {
        console.log('API call successful.');
    }
});

var purgeurl = {
    urls: [ 'demo-1.kxcdn.com/lorem.css', 'demo-1.kxcdn.com/lorem.jpg' ]
};

// purge single or multiple URLs
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

```
