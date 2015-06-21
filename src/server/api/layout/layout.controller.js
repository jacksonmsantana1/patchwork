'use strict';

var Layout = require('./layout.model');

module.exports = {
	saveLayoutOnType: function (req, res) {
		if (req.params.type && req.body.layout) {
			var layout = new Layout(req.body.layout);
			layout.save(function (err, data) {
				if (err) {
					res.send(500, {ok:false, message: err});
				} else {
					res.send(200, {ok: true, layout: data});
				}
			});
		} else {
			if (req.params.type) {
				res.send(400, {ok: false, message:'There was no tyoe required in the request.'});
			} else if (req.body.layout) {
				res.send(400, {ok: false, message:'There was no layout in request body.'});
			} else {
				res.send(500, {ok: false, message:'There was some internal error.'});
			}
		}
	},
	getLayoutsByType: function (req, res) {
		if (req.params.type) {
			Layout.find({type: req.params.type}, function (err, data) {
				if (err) {
					res.send(500, {ok:false, message: err});
				} else if (data) {
					res.send(200, {ok: true, layouts: data});
				} else {
					res.send(404, {ok: true, message: 'No layouts found on database.'});
				}
			});
		} else {
			res.send(400, {ok: false, message:'There was no tyoe required in the request.'});
		}
	},
	getlayoutByName: function (req, res) {
		//TODO
	}
};
