var app = require('../index');
var request = require('supertest');

describe('ActivityRoute', function () {

    after(() => {
        process.exit();
    });

    it('Must activate a valid user', function (done) {
        request(app)
            .post('/enableActivity')
            .send({ email: 'teste@teste.com' })
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                    return done(err);
                }
                done();
            });
    });

    it('Must have the user already been activated', function (done) {
        request(app)
            .post('/enableActivity')
            .send({ email: 'teste@teste.com' })
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                    return done(err);
                }
                done();
            });
    });

    it('Must nost activate a blank email', function (done) {
        request(app)
            .post('/enableActivity')
            .send()
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                    return done(err);
                }
                done();
            });
    });

    it('Must nost activate an invalid email format', function (done) {
        request(app)
            .post('/enableActivity')
            .send({ email: 'invalidemailformat' })
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                    return done(err);
                }
                done();
            });
    });

    it('Must update the activities', function (done) {
        request(app)
            .post('/activity')
            .send({
                email: 'teste@teste.com',
                activities: [{
                    url: 'http://teste.com',
                    date: new Date()
                }]
            })
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                    return done(err);
                }
                done();
            });
    });

    it('Must not update the activities (user not found)', function (done) {
        request(app)
            .post('/activity')
            .send({
                email: 'emailaddressneverusedbefore@teste.com',
                activities: [{
                    url: 'http://teste.com',
                    date: new Date()
                }]
            })
            .expect(400)
            .expect('user not found!')
            .end(function (err, res) {
                if (err) {
                    console.log(err)
                    return done(err);
                }
                done();
            });
    });

});