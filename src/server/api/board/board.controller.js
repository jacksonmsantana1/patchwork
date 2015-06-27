'use strict';

var BoardComplex = require('./schemas/boardComplex.model');
var BoardNormal = require('./schemas/boardNormal.model');
var _ = require('lodash');
var async = require('async');

module.exports = {
    saveBoardOnType: function (req, res) {
        if (req.params.type && req.body.board) {
            var layout, lines = [];
            if (req.body.board.complex) {
				_.each(req.body.board.lines, function (line) {
					async.map(line, function(elem, done){
						done(null, elem);
					}, function (err, results) {
						lines.push(results);
					});
				});

                layout = new BoardComplex({
                    complex: true,
                    type: req.params.type,
                    name: req.body.board.name,
                    descriptionImg: req.body.board.descriptionImg,
                    lines: lines
                });
            } else {
                layout = new BoardNormal({
                    complex: false,
                    type: req.params.type,
                    i: req.body.board.i,
                    j: req.body.board.j,
                    descriptionImg: req.body.board.descriptionImg
                });
            }
            layout.save(function (err, data) {
                if (err) {
                    res.status(500).send({ok:false, message: err});
                } else {
                    res.status(200).send({ok: true, layout: data});
                }
            });
        } else {
            if (req.params.type) {
                res.status(400).send({ok: false, message:'There was no type required in the request.'});
            } else if (req.body.layout) {
                res.status(400).send({ok: false, message:'There was no board in request body.'});
            } else {
                res.status(500).send({ok: false, message:'There was some internal error.'});
            }
        }
    },
    getBoardsByType: function (req, res) {
        if (req.params.type) {
            async.parallel([
                function (cb) {
                    BoardComplex.find({type: req.params.type}, function (err, data) {
                        if (err) {
                            cb(err);
                        } else {
                            cb(null, data);
                        }
                    });
                },
                function (cb) {
                    BoardNormal.find({type: req.params.type}, function (err, data) {
                        if (err) {
                            cb(err);
                        } else {
                            cb(null, data);
                        }
                    });
                }
            ], function (err, results) {
                if (err) {
                    res.status(400).send({ok: false, message:'It was not possible to talk with the db.'});
                } else {
                    res.status(200).send({ok: true, boards: _.union(results[0], results[1])});
                }
            });
        } else {
            res.status(400).send({ok: false, message:'There was no type required in the request.'});
        }
    }
};
