const mongoose = require('mongoose');

const { Schema } = mongoose;

const transferSchema = new Schema({
  transferer: [
    {
      type: String,
      trim: true
    }
  ],
  receiver: [
    {
      type: String,
      trim: true
    }
  ],
  home: {
    type: String,
    required: true,
    unique: true
  },
});


const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
