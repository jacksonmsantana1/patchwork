'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema();
var LineSchema = require('./lines.model');

var BoardComplexSchema = new Schema({
    complex: {type: Boolean, required: true},
    type: {type: String, required: true},
    name: {type: String, required: false},//Required just if the board is complex
    descriptionImg: {type: String, required: true},
    lines: {type: [LineSchema], required: true}
});

BoardComplexSchema.methods.toJSON = function () {
    return this.toObject();
};

module.exports = mongoose.model('BoardComplex', BoardComplexSchema);
