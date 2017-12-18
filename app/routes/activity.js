var express = require('express');
var router = express.Router();

// User database (in memory)
var users = [];

router.get('/', function (req, res) {
    res.render('contatos.ejs', {
        users: users
    });
});

router.post('/enableActivity', function (req, res) {
    var email = req.body.email;

    // Validates email format
    if (!email || !email.match(/\w+@\w+\.\w+/g)) {
        return res.status(400).send('invalid email address');
    }

    // Verify if the user is already registered
    let user = users.find((item) => {
        return item.email == email;
    });

    // If not registered, add the new user
    if (!user) {
        users.push({
            email: email,
            activities: []
        });
    } else {
        return res.status(200).send();
    }

    return res.status(201).send();
});

router.post('/activity', function (req, res) {
    var newUser = req.body;

    // Find the user
    let user = users.find((u) => {
        return u.email == newUser.email;
    });

    // Include the activities
    if (user) {
        user.activities = user.activities.concat(newUser.activities)
    } else {
        return res.status(400).send('user not found!');
    }

    res.send('activity received');
});

module.exports = router;