const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public (or Private) -> Plan says Student can view, Admin can view.
const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 });
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a notice
// @route   POST /api/notices
// @access  Private (Admin only)
const createNotice = async (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const notice = await Notice.create({
            title: req.body.title,
            description: req.body.description,
            postedBy: req.user.id
        });
        res.status(201).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
// @access  Private (Admin only)
const deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        await notice.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a notice
// @route   PUT /api/notices/:id
// @access  Private (Admin only)
const updateNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        const updatedNotice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedNotice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotices,
    createNotice,
    deleteNotice,
    updateNotice
};
