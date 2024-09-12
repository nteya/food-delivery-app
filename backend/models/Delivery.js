// models/Delivery.js
const mongoose = require('mongoose');

// Define the schema for the Delivery model
const deliverySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pending',  // Options could be 'pending', 'in-progress', 'delivered'
  }
});

// Create the Delivery model from the schema
const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;



