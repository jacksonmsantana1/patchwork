'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var LayoutSchema = new Schema({
	type: {type: String, required: true},
	elements: [
		[
			{
				//Polygon
				group: {type: Number, required: false},
				coordenates: {type: String, required: false},
				//Circle
				radio: {type: String, required: false},
				//Retangule
				width: {type: String, required: false},
				height: {type: String, required: false},
				//Path
				path: {type: String, required: false},
				//Group
				//TODO
				img: {type: String, required: true},
				type: {type: String, required: true}
			}
		]
	]
});

LayoutSchema.methods.toJSON = function () {
	return this.toObject();
};

module.exports = mongoose.model('Layout', LayoutSchema);
