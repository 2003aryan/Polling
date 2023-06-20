const mongoose = require('mongoose');

const Poll = new mongoose.Schema({
    ques: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
    options: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model('Polls', Poll);