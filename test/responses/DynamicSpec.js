var expect = require('chai').expect;
var CCBill = require('../../lib');
var Dynamic = require('../../lib/responses/dynamic');

describe('dynamic pricing response', function () {
    var client, form;

    beforeEach(function () {
        client = new CCBill({ accnum: '123', subacc: '456', salt: '789' });
        form = new CCBill.Form.Dynamic(client, {
            'formName': '75cc',
            'formPrice': '18.00',
            'formPeriod': 10,
            'currencyCode': 840
        });
    });

    it('is invalid without code', function () {
        var res = new Dynamic(client, { subscription_id: 123 });
        expect(res.isValid()).to.equal.false;
        expect(res.isSuccessful()).to.equal.false;
    });

    it('is invalid with bad code', function () {
        var res = new Dynamic(client, {
            subscription_id: 123,
            responseDigest: 'd41d8cd98f00b204e9800998ecf8427e',
            denialId: ''
        });
        expect(res.isValid()).to.equal.false;
        expect(res.isSuccessful()).to.equal.false;
    });

    it('is valid with good code', function () {
        var res = new Dynamic(client, {
            subscription_id: 123,
            responseDigest: '588cb02e280672000bdd5144b9148182',
            denialId: ''
        });
        expect(res.isValid()).to.equal.true;
        expect(res.isSuccessful()).to.equal.true;
    });

    it('is valid with error', function () {
        var res = new Dynamic(client, {
            subscription_id: 123,
            denialId: 2,
            responseDigest: '7396330c6ba8953e267957e1b1fdc7fe',
        });
        expect(res.isValid()).to.equal.true;
        expect(res.isSuccessful()).to.equal.false;
    });
});
