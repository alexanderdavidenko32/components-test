var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),

    app = express(),
    port = 8082;

app.use('/build', express.static('client/build'));
app.use('/vendors', express.static('client/vendors'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/components', function(req, res, next) {
    var elements = {
        data: [
            {type: 'text', value: 'text field', validators: {minLength: 10}},
            {type: 'checkbox', value: true, validators: {required: true}},
            {type: 'password', value: 'pass', validators: {minLength: 10}},
            {type: 'datepicker', validators: {format: 'dd/mm/yy'}},
            {type: 'number', value: 3, validators: {minValue: 2, maxValue: 5}},
            {type: 'textarea', value: 'text for textarea', validators: {minLength: 10, maxLength: 20}},
        ]
    };
    res.send(JSON.stringify(elements));
});

app.get('*', function(req, res) {
    res.sendFile(path.resolve('client/build/html/index.html'));
});

app.listen(port, function() {
    console.log('server started at http://localhost:' + port);
});

