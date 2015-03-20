var crypto = require('crypto');
var Postback = require('./postback');

function DynamicResponse () {
    Postback.apply(this, arguments);
}

DynamicResponse.prototype = new Postback();

DynamicResponse.prototype.isValid = function () {
    var hash = null;
    if (this.has('denialId')) {
        hash = this.get('denialId') + '0' + this._client.getSalt();
    } else {
        hash = this.get('subscription_id') + '1' +  this._client.getSalt();
    }

    hash = crypto.createHash('md5').update(hash).digest('hex');

    return hash === this.get('responseDigest');
};

module.exports = DynamicResponse;
