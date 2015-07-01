'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./block.controller');

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
router.get('/', controller.getBlocks);
router.get('/:name', controller.getBlockByName);
router.post('/', controller.saveBlock);
router.put('/:name', controller.updateBlock);
router.delete('/:name', controller.removeBlock);

module.exports = router;
