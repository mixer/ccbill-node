var expect = require('chai').expect;
var CCBill = require('../../lib');
var Postback = require('../../lib/responses/postback');

describe('postback response', function () {
    var client;

    beforeEach(function () {
        client = new CCBill({ accnum: '123', subacc: '456', salt: '789' });
    });

    it('getters work', function () {
        var res = new Postback(client, { a: 'b' });
        expect(res.get('a')).to.equal('b');
        expect(res.get('b')).to.be.undefined;
        expect(res.has('a')).to.be.true;
        expect(res.has('b')).to.be.false;
    });

    it('sets status when successful', function () {
        var res = new Postback(client, {});
        expect(res.isSuccessful()).to.be.true;
        expect(res.isFailed()).to.be.false;
        expect(res.isValid()).to.be.true;
    });

    it('sets status when failed', function () {
        var res = new Postback(client, { denialId: 2 });
        expect(res.isSuccessful()).to.be.false;
        expect(res.isFailed()).to.be.true;
        expect(res.isValid()).to.be.true;
    });
});
