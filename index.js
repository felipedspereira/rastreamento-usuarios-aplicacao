var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

// Cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

// Import routes
var activityRoutes = require('./app/routes/activity')(app);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});