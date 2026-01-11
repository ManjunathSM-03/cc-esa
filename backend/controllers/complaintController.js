const Complaint = require('../models/Complaint');

// @desc    Get complaints
// @route   GET /api/complaints
// @access  Private
const getComplaints = async (req, res) => {
    try {
        let complaints;
        if (req.user.role === 'admin') {
            complaints = await Complaint.find().populate('user', 'name email').sort({ date: -1 });
        } else {
            complaints = await Complaint.find({ user: req.user.id }).sort({ date: -1 });
        }
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create complaint
// @route   POST /api/complaints
// @access  Private
const createComplaint = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const complaint = await Complaint.create({
            user: req.user.id,
            title,
            description
        });
        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private (Admin)
const updateComplaintStatus = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getComplaints,
    createComplaint,
    updateComplaintStatus
};
