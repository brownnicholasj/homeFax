const mongoose = require('mongoose');

const { Schema } = mongoose;
const attributeSchema = require('./Attribute')

const areaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  attributes: [attributeSchema],
});


module.exports = areaSchema;
