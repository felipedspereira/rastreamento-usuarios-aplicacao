module.exports = function (app) {
    var users = [];

    app.get('/', function (req, res) {
        res.render('contatos.ejs', {
            users: users
        });
    });

    app.post('/enableActivity', function (req, res) {
        var email = req.body.email;

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
        }
        
        res.send();
    });

    app.post('/activity', function (req, res) {
        var newUser = req.body;

        // Find the user
        let user = users.find((user) => {
            return user.email == newUser.email;
        });

        // Include the activities
        if (user != null) {
            user.activities = user.activities.concat(newUser.activities)
        }

        return res.send('activity received');
    });

};