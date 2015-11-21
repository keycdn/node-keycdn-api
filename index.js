var request = require('request');
var querystring = require('querystring');

/**
 * KeyCDN API Client for NodeJS
 * @constructor
 * @param {string}    apiKey          Your account's KeyCDN API Key
 * @author KeyCDN <support@keycdn.com> (www.keycdn.com)
 */
function KeyCDN(apiKey) {
    if (typeof apiKey !== 'string') {
        throw new Error('api key missing or not a string');
    }

    this.apiServer = 'https://api.keycdn.com/';
    this.apiKey     = apiKey;

    headers = {
        "Accept" : "*/*",
        "Connection" : "close",
        "User-Agent" : "Node KeyCDN API Client"};

    return this;
}

KeyCDN.prototype._call = function(url, method, data, callback) {

    var qs, body;
    if (method == 'get') {
        qs = data;
    } else {
        body = data;
    }

	request({
        method: method,
		url: url,
		strictSSL: true,
        json: true,
        body: body,
        qs: qs
	}, function(error, response, data) {
		if (!error && !!data.status && data.status !== 'success') {
			error = new Error(data.description || data.error_message);
		}
		callback(error, data || {});
	}).auth(this.apiKey, '');
};

KeyCDN.prototype.get = function get(url, data, callback) {

    if (callback === undefined) {
        callback = data;
        data = '';
    }

    this._call(this.apiServer + url, 'get', data, callback);
};

KeyCDN.prototype.post = function post(url, data, callback) {
    this._call(this.apiServer + url, 'post', this._makeObject(data), callback);
};

KeyCDN.prototype.put = function put(url, data, callback) {
    this._call(this.apiServer + url, 'put', this._makeObject(data), callback);
};

KeyCDN.prototype.del = function del(url, data, callback) {

    if (callback === undefined) {
        callback = data;
        data = '';
    }

    this._call(this.apiServer + url, 'delete', this._makeObject(data), callback);
};

KeyCDN.prototype._makeObject = function _makeObject(params) {
    if (typeof params === 'string') {
        try {
            return JSON.parse(params);
        } catch (e) {
            try {
                return querystring.parse(params);
            } catch (ee) {
                throw new Error('invalid params string');
            }
        }
    }
    return params;
};

module.exports = KeyCDN;
