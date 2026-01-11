const express = require('express');
const router = express.Router();
const { getEvents, addEvent, deleteEvent } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getEvents);
router.post('/', protect, admin, addEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;
