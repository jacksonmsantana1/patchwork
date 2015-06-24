'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema();
var ElementSchema = require('./element.model');

var LineSchema = new Schema({
    elements: [ElementSchema]
});

LineSchema.methods.toJSON = function () {
    return this.toObject();
};

module.exports = mongoose.model('Line', LineSchema);
