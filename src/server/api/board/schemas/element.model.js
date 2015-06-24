'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var ElementSchema = new Schema({
    //Main properties
    type: {type: String, required: true},
    px: {type: String, required: true},
    py: {type: String, required: true},
    //Polygon
    coordenates: {type: String, required: false},
    //Circle
    radio: {type:String, required: false},
    //Retangule
    width: {type: String, required: false},
    height: {type: String, required: false},
    //Path
    parh: {type: String, required: false},
    //Group
    groupName: {type: String, required: false}

});

ElementSchema.methods.toJSON = function () {
    return this.toObject();
};

module.exports = mongoose.model('Line', ElementSchema);
