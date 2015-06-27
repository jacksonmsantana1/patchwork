'use strict';

var mongoose = require('mongoose');

var BoardNormalSchema = new mongoose.Schema({
    complex: {type: Boolean, required: true},
    type: {type: String, required: true},
    i: {type: Number, required: true},
    j: {type: Number, required: true},
    descriptionImg: {type: String, required: true}
});

BoardNormalSchema.methods.toJSON = function () {
    return this.toObject();
};

module.exports = mongoose.model('BoardNormal', BoardNormalSchema);
