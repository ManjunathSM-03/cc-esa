const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String
    },
    contact: {
        type: String,
        required: true
    },
    image: {
        type: String // URL to image if we implement upload later
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('LostFound', lostFoundSchema);
