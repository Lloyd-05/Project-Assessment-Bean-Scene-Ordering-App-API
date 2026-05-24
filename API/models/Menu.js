const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({

    // MenuItemID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     auto: true
    // },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
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
        type: [String],
        required: true
    },
    Availability: {
        type: Boolean,
        required: true
    },
},
    {
        collection: 'Menu'
    },
);

module.exports = mongoose.model('Menu', menuSchema);