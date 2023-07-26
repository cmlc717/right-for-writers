const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'..','public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/apiRoutes', require('./apiRoutes'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;