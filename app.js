let express = require('express');

let app = express();
let makes = require('./api/makes/makes.routes');
let types = require('./api/types/types.routes');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/makes', makes);
app.use('/api/types', types);

module.exports = app;