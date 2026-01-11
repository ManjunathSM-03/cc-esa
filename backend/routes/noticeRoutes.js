const express = require('express');
const router = express.Router();
const { getNotices, createNotice, deleteNotice, updateNotice } = require('../controllers/noticeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getNotices);
router.post('/', protect, admin, createNotice);
router.put('/:id', protect, admin, updateNotice);
router.delete('/:id', protect, admin, deleteNotice);

module.exports = router;
