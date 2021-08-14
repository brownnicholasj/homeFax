const mongoose = require('mongoose');
const detailSchema = require('./Detail')

const { Schema } = mongoose;

const attributeSchema = new Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  detail: detailSchema,
});


module.exports = attributeSchema;
