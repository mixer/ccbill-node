var expect = require('chai').expect;
var CCBill = require('../lib');

describe('currency coder', function () {
    var client;

    it('takes common name', function () {
        expect(CCBill.currency.from('USD')).to.equal('840');
    });

    it('takes numeric', function () {
        expect(CCBill.currency.from('840')).to.equal('840');
    });

    it('throws on invalid string', function () {
        expect(function () {
            CCBill.currency.from('FOO'); // the primary currency of Barland
        }).to.throw(CCBill.Error.InvalidCurrencyError);
    });

    it('throws on invalid number', function () {
        expect(function () {
            CCBill.currency.from('666');
        }).to.throw(CCBill.Error.InvalidCurrencyError);
    });
});
