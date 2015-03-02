var expect = require('chai').expect;
var CCBill = require('../lib');

describe('client', function () {
    var client;

    beforeEach(function () {
        client = new CCBill({ accnum: '123', subacc: '456', salt: '789' });
    });

    it('gets values', function () {
        expect(client.getDetails()).to.deep.equal({ accnum: '123', subacc: '456', salt: '789' });
        expect(client.getAccNum()).to.equal('123');
        expect(client.getSubAccNum()).to.equal('456');
        expect(client.getSalt()).to.equal('789');
    });

    it('builds urls', function () {
        client.setBaseUrl('https://beam.pro');
        expect(client.buildUrl('/foo/bar')).to.equal('https://beam.pro/foo/bar');
        expect(client.buildUrl('foo/bar')).to.equal('https://beam.pro/foo/bar');
        client.setBaseUrl('https://beam.pro/');
        expect(client.buildUrl('/foo/bar')).to.equal('https://beam.pro/foo/bar');
        expect(client.buildUrl('foo/bar')).to.equal('https://beam.pro/foo/bar');

        expect(client.buildUrl('foo/bar', { a: 'b'})).to.equal('https://beam.pro/foo/bar?a=b');
    });
});
