const express = require('express');
const router = express.Router();
const { getLostFoundItems, createLostFoundItem, deleteLostFoundItem } = require('../controllers/lostFoundController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getLostFoundItems);
router.post('/', protect, createLostFoundItem);
router.delete('/:id', protect, deleteLostFoundItem);

module.exports = router;
