'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Address = mongoose.model('Address');

var credentials,
    token,
    mockup;

describe('Address CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            house_no: 'house_no',
            village: 'village',
            subdistrict: 'subdistrict',
            district: 'district',
            province: 'province',
            postalcode: 'postalcode'

        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Address get use token', (done) => {
        request(app)
            .get('/api/addresss')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Address get by id', function (done) {

        request(app)
            .post('/api/addresss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/addresss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.house_no, mockup.house_no);
                        assert.equal(resp.data.village, mockup.village);
                        assert.equal(resp.data.subdistrict, mockup.subdistrict);
                        assert.equal(resp.data.district, mockup.district);
                        assert.equal(resp.data.province, mockup.province);
                        assert.equal(resp.data.postalcode, mockup.postalcode);
                        done();
                    });
            });

    });

    it('should be Address post use token', (done) => {
        request(app)
            .post('/api/addresss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.house_no, mockup.house_no);
                assert.equal(resp.data.village, mockup.village);
                assert.equal(resp.data.subdistrict, mockup.subdistrict);
                assert.equal(resp.data.district, mockup.district);
                assert.equal(resp.data.province, mockup.province);
                assert.equal(resp.data.postalcode, mockup.postalcode);
                done();
            });
    });

    it('should be address put use token', function (done) {

        request(app)
            .post('/api/addresss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    house_no: 'house_no update'
                }
                request(app)
                    .put('/api/addresss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.house_no, update.house_no);
                        done();
                    });
            });

    });

    it('should be address delete use token', function (done) {

        request(app)
            .post('/api/addresss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/addresss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be address get not use token', (done) => {
        request(app)
            .get('/api/addresss')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be address post not use token', function (done) {

        request(app)
            .post('/api/addresss')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be address put not use token', function (done) {

        request(app)
            .post('/api/addresss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    house_no: 'house_no update'
                }
                request(app)
                    .put('/api/addresss/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be address delete not use token', function (done) {

        request(app)
            .post('/api/addresss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/addresss/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Address.remove().exec(done);
    });

});