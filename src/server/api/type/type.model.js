'use strict';

var config = require('../../config/environment');
var mongoose = require('mongoose');

var TypeSchema = new mongoose.Schema({
    name: String,
    img: String
});


TypeSchema.methods.toJSON = function () {
    return this.toObject();
};

module.exports = mongoose.model('Type', TypeSchema);
