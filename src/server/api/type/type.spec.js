//var chai = require('chai');
//var expect = chai.expect;
//var request = require('supertest');
//var config = require('../../config/environment');
//var mongoose = require('mongoose');
//var Type = require('./type.model');
//var MONGODB_URI = config.db.baseUrl + config.db.projectName;
//var app = require('../../app');
//
//chai.should();
//
//describe('Type', function () {
//
//    before(function(done){
//        if (!mongoose.connection.readyState) {
//            mongoose.connect(MONGODB_URI, {}, function (err) {
//                if (err) {
//                    done(err);
//                } else {
//                    console.log('MongoDB Test running...\n');
//                    done();
//                }
//            });
//        } else {
//            done();
//        }
//    });
//
//    describe('GET', function () {
//
//        beforeEach(function (done) {
//            Type.create({name: 'Colchas', img: 'www.cuzao.com.br/blabla'}, function (err, data) {
//                if (err) {
//                    console.log('Error on saving the type object.');
//                    done(err);
//                } else {
//                    console.log('Saving the mock type object..\n');
//                    done();
//                }
//            });
//        });
//
//        afterEach(function (done) {
//            Type.remove({}, function() {
//                console.log('Clearing the Type database..\n');
//                done();
//            });
//        });
//
//        it('/type Should return all Types objects', function (done) {
//            request(app)
//                .get('/api/type/')
//                .set('Accept', 'application/json')
//                .expect('Content-Type', /json/)
//                .expect('charset', 'UTF-8')
//                .expect(500,function () {
//                    done();
//                });
//        });
//
//        it('/type Should return 500 when theres no object on database', function (done) {
//            Type.remove({}, function() {
//                console.log('Clearing the Type database..\n');
//                request(app)
//                    .get('/api/type/')
//                    .set('Accept', 'application/json')
//                    .expect(500, done);
//            });
//        });
//
//        it('/type/:name Should return the object with the given name', function (done) {
//            request(app)
//                .get('/api/type/Colchas')
//                .set('Accept', 'application/json')
//                .expect('Content-Type', /json/)
//                .expect('charset', 'UTF-8')
//                .expect({name: 'Colchas', img: 'www.cuzao.com.br/blabla'}, done);
//        });
//
//    });
//
//    after(function (done) {
//        mongoose.connection.db.dropDatabase(function (err) {
//            if (err) {
//                console.log('Error on droping db.\n');
//                done(err)
//            } else {
//                console.log('MongoDB Test exit.\n');
//                mongoose.connection.close(done);
//            }
//        });
//    });
//
//});
