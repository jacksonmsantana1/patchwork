'use strict';

var BoardComplex = require('./schemas/boardComplex.model');
var BoardNormal = require('./schemas/boardNormal.model');
var LineSchema = require('./schemas/lines.model');
var ElementSchema = require('./schemas/element.model');
var _ = require('lodash');
var async = require('async');

module.exports = {
    saveBoardOnType: function (req, res) {
        if (req.params.type && req.body.layout) {
            var layout;
            var lines = [];
            if (req.body.layout.complex) {
                _.each(req.body.layout.lines, function (line) {
                    var l = new LineSchema({elements: []});
                    lines.push(l);
                    _.each(line, function (elem) {
                        var element = new ElementSchema(elem);
                        l.elements.push(element);
                    });
                });

                layout = new BoardComplex({
                    complex: true,
                    type: req.params.type,
                    name: req.body.layout.name,
                    descriptionImg: req.body.layout.descriptionImg,
                    lines: lines
                });
            } else {
                layout = new BoardNormal({
                    complex: false,
                    type: req.params.type,
                    i: req.body.layout.i,
                    j: req.body.layout.j,
                    descriptionImg: req.body.layout.descriptionImg,
                });
            }
            layout.save(function (err, data) {
                if (err) {
                    res.send(500, {ok:false, message: err});
                } else {
                    res.send(200, {ok: true, layout: data});
                }
            });
        } else {
            if (req.params.type) {
                res.send(400, {ok: false, message:'There was no type required in the request.'});
            } else if (req.body.layout) {
                res.send(400, {ok: false, message:'There was no board in request body.'});
            } else {
                res.send(500, {ok: false, message:'There was some internal error.'});
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
                    res.send(400, {ok: false, message:'It was not possible to talk with the db.'});
                } else {
                    res.send(200, {ok: true, boards: _.union(results[0], results[1])});
                }
            });
        } else {
            res.send(400, {ok: false, message:'There was no type required in the request.'});
        }
    }
};
