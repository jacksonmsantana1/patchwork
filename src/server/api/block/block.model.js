'use strict';

var mongoose = require('mongoose');

var BlockSchema = new mongoose.Schema({
	name: {type: String, required: true},
	imgDescription: {type:String, required: true},
	elements: [mongoose.Schema.Types.Mixed]
});

BlockSchema.methods.toJSON = function () {
	return this.toObject();
};

module.exports = mongoose.model('Block', BlockSchema);
