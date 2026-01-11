const LostFound = require('../models/LostFound');

// @desc    Get all lost found items
// @route   GET /api/lostfound
// @access  Private
const getLostFoundItems = async (req, res) => {
    try {
        const items = await LostFound.find().sort({ date: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create lost found item
// @route   POST /api/lostfound
// @access  Private
const createLostFoundItem = async (req, res) => {
    const { title, description, category, location, contact, image } = req.body;

    if (!title || !description || !category || !contact) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    try {
        const item = await LostFound.create({
            title,
            description,
            category,
            location,
            contact,
            image,
            postedBy: req.user.id
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete item
// @route   DELETE /api/lostfound/:id
// @access  Private (Owner or Admin)
const deleteLostFoundItem = async (req, res) => {
    try {
        const item = await LostFound.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check user
        if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await item.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getLostFoundItems,
    createLostFoundItem,
    deleteLostFoundItem
};
