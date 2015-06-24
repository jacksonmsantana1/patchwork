'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var BoardNormalSchema = new Schema({
    complex: {type: Boolean, required: true},
    type: {type: String, required: true}, //Simple || Complex
    i: {type: Number, required: true},
    j: {type: Number, required: true},
    descriptionImg: {type: String, required: true}
});

BoardNormalSchema.methods.toJSON = function () {
    return this.toObject();
};

module.exports = mongoose.model('BoardNormal', BoardNormalSchema);
