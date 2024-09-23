const express = require('express');
const Notification = require('../models/Notification');

const router = express.Router();

// Create a new notification
router.post('/', async (req, res) => {
    const { title, message } = req.body;

    const notification = new Notification({ title, message });
    await notification.save();

    res.status(201).json(notification);
});

// Get all notifications
router.get('/', async (req, res) => {
    const notifications = await Notification.find();
    res.json(notifications);
});

// Other routes (update, delete) can be added here

module.exports = router;
