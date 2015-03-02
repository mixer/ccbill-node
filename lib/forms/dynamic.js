var crypto = require('crypto');
var Response = require('../responses/dynamic');

function DynamicForm (client, data) {
    this._data = data;
    this._client = client;
    return this;
}

/**
 * Updates the data. Takes one object as an argument to extend the
 * data, or a key/vale pair.
 *
 * @param {String|Object} key
 * @param {*=} value
 */
DynamicForm.prototype.set = function (key, value) {
    if (typeof key === 'object') {
        for (var k in key) {
            this._data[k] = key[k];
        }
    } else {
        this._data[key] = value;
    }

    return this;
};

/**
 * Determines whether the form is recurring, or not.
 * @return {Boolean}
 */
DynamicForm.prototype.isRecurring = function () {
    return !!(+this._data.formRebills && this._data.formRebills !== 0);
};

/**
 * Creates a copy of the form data, including the client account
 * and subaccount numbers.
 * @return {Object}
 */
DynamicForm.prototype._withClientData = function () {
    var output = {
        clientSubacc: this._client.getSubAccNum(),
        clientAccnum: this._client.getAccNum()
    };

    for (var key in this._data) {
        output[key] = this._data[key];
    }
    return output;
};

/**
 * Adds the formDigest to the form, which is based on an md5 hash of
 * various values defined by CCBill.
 * @param {Object} data
 * @return {Object}
 */
DynamicForm.prototype._addFormHash = function (data) {
    var toHash;
    if (this.isRecurring()) {
        toHash = [
            data.formPrice,
            data.formPeriod,
            data.formRecurringPrice,
            data.formRecurringPeriod,
            data.formRebills,
            data.currencyCode,
            this._client.getSalt()
        ];
    } else {
        toHash = [
            data.formPrice,
            data.formPeriod,
            data.currencyCode,
            this._client.getSalt()
        ];
    }

    data.formDigest = crypto
        .createHash('md5')
        .update(toHash.join(''))
        .digest('hex');

    return data;
};

/**
 * Serializes form data into an object for submission to ccbill.
 * @return {Object}
 */
DynamicForm.prototype.serialize = function () {
    return this._addFormHash(this._withClientData());
};

/**
 * Builds the form by passing it to the given function.
 * @param  {Function} fn
 * @return {*}
 */
DynamicForm.prototype.build = function (fn) {
    return fn(this._client, this.serialize());
};

/**
 * Caputures the "data" and returns a response object.
 * @param  {Object} data
 * @return {DynamicResponse}
 */
DynamicForm.prototype.capture = function (data) {
    return new Response(this._client, data);
};

module.exports = DynamicForm;
