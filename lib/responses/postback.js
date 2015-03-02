function PostbackResponse (client, data) {
    this._client = client;
    this._data = data;
}

/**
 * Returns true iff the postback was valid and successful.
 * @return {Boolean}
 */
PostbackResponse.prototype.isSuccessful = function () {
    return this.isValid() && !this.has('denialId');
};

/**
 * Returns true if the postback was invalid or unsuccessful.
 * @return {Boolean}
 */
PostbackResponse.prototype.isFailed = function () {
    return !this.isSuccessful();
};

/**
 * Returns true if the postback response was valid.
 * @return {Boolean}
 */
PostbackResponse.prototype.isValid = function () {
    return true;
};

/**
 * Returns an item from the response data.
 * @param  {String} key
 * @return {*}
 */
PostbackResponse.prototype.get = function (key) {
    return this._data[key];
};

/**
 * Returns whether the postback contains the key in its data.
 * @param  {String}  key
 * @return {Boolean}
 */
PostbackResponse.prototype.has = function (key) {
    return typeof this.get(key) !== 'undefined';
};

module.exports = PostbackResponse;
