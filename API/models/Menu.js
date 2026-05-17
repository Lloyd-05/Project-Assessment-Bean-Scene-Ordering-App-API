const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({

    MenuItemID: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        enum: ['entrees', 'mains', 'desserts', 'drinks', 'sides', 'specials'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    dietaryFlags: {
        type: String,
        required: true
    },
    Availability: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Menu', menuSchema);