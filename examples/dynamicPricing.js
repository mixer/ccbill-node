var CCbill = require('ccbill');

// First, make the ccbill client
var client = new CCBill({ accnum: '123', subacc: '456', salt: '789' });

// Then create the form for a dynamic pricing request.
var form = CCBill.Form.Dynamic(client, {
    'formName': '75cc',
    'formPrice': '18.00',
    'formPeriod': 10,
    'currencyCode': CCBill.currency.from('USD')
});




// ** later ** //
app.post('/payment/confirm', function (req, res) {
    if (form.capture(req.body).isSuccessful()) {
        res.send('Your payment has been processed!');
    } else {
        res.send('Something went wrong!');
    }
});

app.get('/payment/start', function (req, res) {
    res.send('Go to this address to purchase: ' + form.build(CCbill.Build.Url));
});
