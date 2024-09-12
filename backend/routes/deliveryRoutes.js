// routes/deliveryRoutes.js
const express = require('express');
const Delivery = require('../models/Delivery'); // Import the Delivery model
const router = express.Router();

// Create a new delivery
router.post('/', async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    const newDelivery = new Delivery({ name, address, phone });
    await newDelivery.save(); // Save the new delivery in the database
    res.status(201).json(newDelivery);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create delivery', error: err.message });
  }
});

// Get all deliveries
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch deliveries', error: err.message });
  }
});

// Update delivery status
router.put('/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.status(200).json(delivery);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update delivery', error: err.message });
  }
});

// Delete a delivery
router.delete('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.status(200).json({ message: 'Delivery deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete delivery', error: err.message });
  }
});

module.exports = router;



