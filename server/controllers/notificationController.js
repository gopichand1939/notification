const Notification = require('../models/Notification');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id });
  res.json(notifications);
};

// @desc    Create a new notification
// @route   POST /api/notifications
// @access  Private
const createNotification = async (req, res) => {
  const { type, message } = req.body;

  const notification = new Notification({
    user: req.user._id,
    type,
    message,
  });

  const createdNotification = await notification.save();
  res.status(201).json(createdNotification);
};

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id
// @access  Private
const markAsRead = async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.read = true;
    await notification.save();
    res.json({ message: 'Notification marked as read' });
  } else {
    res.status(404);
    throw new Error('Notification not found');
  }
};

module.exports = { getNotifications, createNotification, markAsRead };
