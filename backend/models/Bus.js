const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    route: {
        type: String,
        required: true
    },
    busNumber: {
        type: String,
        required: true
    },
    time: {
        type: String, // e.g., '08:30 AM'
        required: true
    },
    driverName: {
        type: String
    },
    driverContact: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
