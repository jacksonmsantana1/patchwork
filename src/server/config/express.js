/**
 * Express Configuration File
 */

'use strict';

var bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    bodyParser = require('body-parser'),
	compress = require('compression'),
	cors = require('cors'),
	logger = require('morgan'),
    config = require('./environment'),
    environment = config.env,
    passport = require('passport'),
    express = require('express');

module.exports = function (app) {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(compress());
    app.use(logger('dev'));
    app.use(cors());

    switch (environment) {
        case 'build':
            console.log('** BUILD **');
            app.use(express.static('./build/'));
            app.use('/app/*', function(req, res, next) {
                return res.status(404).json({ok: 'false', info: 'Page not found'});
            });
            app.use('/*', express.static('./build/index.html'));
            break;
        default:
            console.log('** DEV **');
            app.use(express.static('./src/client/'));
            app.use(express.static('./'));
            app.use(express.static('./.tmp'));
            app.use('/app/*', function(req, res, next) {
                return res.status(404).json({ok: 'false', info: 'Page not found'});
            });
            app.use('/*', express.static('./src/client/index.html'));
            break;

    }

    app.use(errorHandler());
};
