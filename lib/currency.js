var errors = require('./errors');

function Currency () {
    this._codes = {
        AUD: '036',
        CAD: '124',
        JPY: '392',
        GBP: '826',
        USD: '840',
        EUR: '978'
    };
}

/**
 * Takes a currency code and returns the numeric code for ccbill.
 * Throws in invalid.
 *
 * @param  {Number|String} code
 * @return {String}
 */
Currency.prototype.from = function (code) {
    // If it's a valid code, just return it.
    var out = this._codes[code];
    if (typeof out !== 'undefined') {
        return out;
    }

    // Otherwise, it might already be valid?
    for (var key in this._codes) {
        out = this._codes[key];
        if (+out === +code) {
            return out;
        }
    }

    // Not valid at this point :( throw an error
    throw new errors.InvalidCurrencyError(code);
};

module.exports = Currency;
