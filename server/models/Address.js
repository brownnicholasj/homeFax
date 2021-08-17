const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema({
  street1: {
    type: String,
    required: true,
    trim: true
  },
  street2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
    trim: true
  },
});


module.exports = addressSchema;
