'use strict';


var express = require('express');
var router = express.Router();
var controller = require('./type.controller');

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
router.get('/', controller.getTypes);
router.get('/:name', controller.getByName);

module.exports = router;
