'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./board.controller');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/:type', controller.getBoardsByType);
router.post('/:type', controller.saveBoardOnType);
