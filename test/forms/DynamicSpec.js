var CCBill = require('../../lib');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('dynamic pricing form', function () {
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

    it('is recurring when rebills', function () {
        expect(form.isRecurring()).to.be.false;
        form.set('formRebills', 1);
        expect(form.isRecurring()).to.be.true;
    });

    it('serializes nonrecurring', function () {
        var obj = form.serialize();
        expect(obj).to.deep.equal({
            clientAccnum: '123',
            clientSubacc: '456',
            formName: '75cc',
            formPrice: '18.00',
            formPeriod: 10,
            currencyCode: 840,
            formDigest: 'd9d6e044d6663cd05d07e15735205a7f'
        });
    });

    it('gets recurring form', function () {
        form.set({
            'formRecurringPrice': '25.00',
            'formRecurringPeriod': 30,
            'formRebills': 1
        });

        var obj = form.serialize();
        expect(obj).to.deep.equal({
            clientAccnum: '123',
            clientSubacc: '456',
            formName: '75cc',
            formPrice: '18.00',
            formPeriod: 10,
            currencyCode: 840,
            formRecurringPrice: '25.00',
            formRecurringPeriod: 30,
            formRebills: 1,
            formDigest: 'c72e144a9b1136c5851413a2fe6d46d4'
        });
    });

    it('builds the form', function () {
        var stub = sinon.stub().returns('foo');
        var built = form.build(stub);
        expect(stub.calledWith(client, form.serialize())).to.be.true;
        expect(built).to.equal('foo');
    });

    it('captures response', function () {
        var data = { a: 'b' };
        var res = form.capture(data);
        expect(res._data).to.equal(data);
        expect(res._client).to.equal(client);
    });
});
