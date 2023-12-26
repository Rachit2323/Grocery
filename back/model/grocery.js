const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
    min: 0,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },
  expiryDate: {
    type: Date,
    default: null, 
  },
  groceryPhoto: {
    secure_url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
});

const Grocery = mongoose.model('Item', itemSchema);

module.exports = Grocery;
