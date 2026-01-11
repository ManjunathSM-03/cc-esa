const Bus = require('../models/Bus');

// @desc    Get all buses
// @route   GET /api/buses
// @access  Private
const getBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a bus
// @route   POST /api/buses
// @access  Private (Admin)
const addBus = async (req, res) => {
    const { route, busNumber, time, driverName, driverContact } = req.body;

    if (!route || !busNumber || !time) {
        return res.status(400).json({ message: 'Please add required fields' });
    }

    try {
        const bus = await Bus.create(req.body);
        res.status(201).json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a bus
// @route   DELETE /api/buses/:id
// @access  Private (Admin)
const deleteBus = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        await bus.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBuses,
    addBus,
    deleteBus
};
