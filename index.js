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

const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log('App listening on port ' + PORT);
});