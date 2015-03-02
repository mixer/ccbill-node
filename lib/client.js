var querystring = require('querystring');

/**
 * Main CCBill client, responsible for storing information necessary to
 * build requests to the ccbill API.
 *
 * @param {Object} details Should contain an accnum, subacc, and salt.
 */
function Client (details) {
    this._details = details;
    this._baseUrl = 'https://bill.ccbill.com/';
}

/**
 * Gets the client's details by reference.
 * @return {Object}
 */
Client.prototype.getDetails = function () {
    return this._details;
};

/**
 * Gets the client account number.
 * @return {String}
 */
Client.prototype.getAccNum = function () {
    return this._details.accnum;
};

/**
 * Gets the client subaccount number.
 * @return {String}
 */
Client.prototype.getSubAccNum = function () {
    return this._details.subacc;
};

/**
 * Gets the client salt number.
 * @return {String}
 */
Client.prototype.getSalt = function () {
    return this._details.salt;
};

/**
 * Sets the client's base URL to make requests from.
 * @param {String} url
 */
Client.prototype.setBaseUrl = function (url) {
    this._baseUrl = url;

    if (this._baseUrl.slice(-1) !== '/') {
        this._baseUrl += '/';
    }
};

/**
 * Builds a new URL by appending it to this base URL. Optionally adds
 * GET parameters.
 * @param  {String} path
 * @param  {Object} params
 * @return {String}
 */
Client.prototype.buildUrl = function (path, params) {
    var generated = this._baseUrl;
    if (path.charAt(0) === '/') {
        generated += path.slice(1);
    } else {
        generated += path;
    }

    if (params) {
        generated += '?' + querystring.stringify(params);
    }

    return generated;
};

module.exports = Client;
