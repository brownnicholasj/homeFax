const mongoose = require('mongoose');
const addressSchema = require('./Address')
const areaSchema = require('./Area')

const { Schema } = mongoose;


const homeSchema = new Schema({
  address: addressSchema,
  areas: [areaSchema],
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
