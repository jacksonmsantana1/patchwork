'use strict';

var Block = require('./block.model');
var _ = require('lodash');
var async = require('async');

module.exports = {
	getBlocks: function (req, res) {
		Block.find({}, function (err, data) {
			if (err) {
				res.status(500).send({ok: false, message: '[Error]Block -> getBlocks -> Block.find()'});
			} else {
				res.status(200).send({ok: true, blocks: data});
			}
		});
	},

	getBlockByName: function (req, res) {
		var block = new Block(req.body.block);
		Block.findOne({name: block.name}, function (err, data) {
			if (err) {
				res.status(500).send({ok: false, message: '[Error]Block -> getBlockByName -> Block.findOne()'});
			} else if (data) {
				res.status(200).send({ok: true, block: data});
			} else {
				res.status(400).send({ok: false, message: '[Error]Block -> getBlockByName -> Block.findOne() -> No block found on db'});
			}
		});
	},

	saveBlock: function (req, res) {
		if (req.body && req.body.block) {
			var block = new Block(req.body.block);
			Block.findOne({name: block.name}, function (err, data) {
				if (err) {
					res.status(500).send({ok: false, message: '[Error]Block -> saveBlock -> Block.find()'});
				} else if (data) {
					res.status(400).send({ok: false, message: '[Error]Block -> saveBlock -> Block already saved on db'});
				} else {
					block.save(function (err, data) {
						if (err) {
							res.status(500).send({ok: false, message: '[Error]Block -> saveBlock -> Block.find() -> Block.save()'});
						} else {
							res.status(200).send({ok: true, block: data});
						}
					});
				}
			});
		} else {
			res.status(400).send({ok: true, message: '[Error]Block -> saveBlock -> No block on body request'});
		}
	},

	updateBlock: function (req, res) {
		if (req.body && req.body.block) {
			var block = new Block(req.body.block);
			Block.findOne({name: block.name}, function (err, data) {
				if (err) {
					res.status(500).send({ok: false, message: '[Error]Block -> updateBlock -> Block.findOne()'});
				} else if (data) {
					data = block;
					data.save(function(err, data) {
						if (err) {
							res.status(500).send({ok: false, message: '[Error]Block -> updateBlock -> Block.findOne() -> Block.save()'});
						} else {
							res.status(200).send({ok: true, block: data});
						}
					});
				} else {
					res.status(400).send({ok: false, message: '[Error]Block -> updateBlock -> Block.findOne() -> No block found on db'});
				}
			});
		} else {
			res.status(400).send({ok: true, message: '[Error]Block -> updateBlock -> No block on body request'});
		}
	},

	removeBlock: function (req, res) {
		Block.find({name: block.name}, function (err, data) {
			if (err) {
				res.status(500).send({ok: false, message: '[Error]Block -> removeBlock -> Block.find()'});
			} else if (data) {
				data.remove(function (err, data) {
					if (err) {
						res.status(500).send({ok: false, message: '[Error]Block -> removeBlock -> Block.find()  -> Block.remove()'});
					} else {
						res.status(200).send({ok: true, block: data});
					}
				});
			} else {
				res.status(400).send({ok: false, message: '[Error]Block -> removeBlock -> Block already removed on db'});
			}
		});
	}
};
