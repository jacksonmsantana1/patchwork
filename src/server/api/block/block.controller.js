'use strict';

var Block = require('./block.model');
var _ = require('lodash');
var async = require('async');

module.exports = {
	getBlocks: function (req, res) {
		Block.find({}, function (err, data) {
			if (err) {
				res.send(500, {ok: false, message: err});
			} else {
				res.send(200, {ok: true, blocks: data});
			}
		});
	},

	getBlockByName: function (req, res) {
		//TODO
	},

	saveBlock: function (req, res) {
		//TODO
	},

	updateBlock: function (req, res) {
		//TODO
	},

	removeBlock: function (req, res) {
		//TODO
	}
};
