const express = require('express');
const router = express.Router();
const { getBuses, addBus, deleteBus } = require('../controllers/busController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getBuses);
router.post('/', protect, admin, addBus);
router.delete('/:id', protect, admin, deleteBus);

module.exports = router;
