const express = require('express');
const router = express.Router();
const { getComplaints, createComplaint, updateComplaintStatus } = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getComplaints);
router.post('/', protect, createComplaint);
router.put('/:id', protect, admin, updateComplaintStatus);

module.exports = router;
