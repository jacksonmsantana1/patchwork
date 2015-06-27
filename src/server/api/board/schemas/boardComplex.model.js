'use strict';

var mongoose = require('mongoose');

var BoardComplexSchema = new mongoose.Schema({
    complex: {type: Boolean, required: true},
    type: {type: String, required: true},
    name: {type: String, required: false},
    descriptionImg: {type: String, required: true},
    lines: [mongoose.Schema.Types.Mixed]
});

BoardComplexSchema.methods.toJSON = function () {
    return this.toObject();
};

module.exports = mongoose.model('BoardComplex', BoardComplexSchema);
