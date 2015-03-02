var util = require('util');

function InvalidCurrencyError (code) {
    Error.call(this);
    this.message = 'Invalid currency code `' + code + '`';
    this.code = code;
}
util.inherits(InvalidCurrencyError, Error);
module.exports.InvalidCurrencyError = InvalidCurrencyError;
