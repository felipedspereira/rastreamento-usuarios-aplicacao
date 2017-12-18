var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .set('views', path.join(__dirname, '/app/views'))
    .set('view engine', 'ejs')
    .use(function (req, res, next) {
        // Enable Cors
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next();
    });

// Import routes
var activityRoutes = require('./app/routes/activity');
app.use('/', activityRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log('App listening on port ' + PORT);
});

module.exports = app;