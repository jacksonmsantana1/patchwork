'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./layout.controller');

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
router.get('/:type', controller.getLayoutsByType);
router.get('/:type/:name', controller.getlayoutByName);
router.post('/:type', controller.saveLayoutOnType);
