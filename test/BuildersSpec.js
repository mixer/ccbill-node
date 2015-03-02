var expect = require('chai').expect;
var CCBill = require('../lib');

describe('building', function () {
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

    it('builds url', function () {
        expect(form.build(CCBill.Build.Url)).to.equal('https://bill.ccbill.com/jpost/signup.cgi?clientSubacc=456&clientAccnum=123&formName=75cc&formPrice=18.00&formPeriod=10&currencyCode=840&formDigest=d9d6e044d6663cd05d07e15735205a7f');
    });

    it('builds form', function () {
        expect(form.build(CCBill.Build.Form)).to.equal(
            '<input type="hidden" name="clientSubacc" value="456">' +
            '<input type="hidden" name="clientAccnum" value="123">' +
            '<input type="hidden" name="formName" value="75cc">' +
            '<input type="hidden" name="formPrice" value="18.00">' +
            '<input type="hidden" name="formPeriod" value="10">' +
            '<input type="hidden" name="currencyCode" value="840">' +
            '<input type="hidden" name="formDigest" value="d9d6e044d6663cd05d07e15735205a7f">'
        );
    });
});
