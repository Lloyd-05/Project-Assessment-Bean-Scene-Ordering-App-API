const mongoose = require('mongoose');
const menu = require('./Menu');
const menuSchema = menu.schema;
const Table = require('./Table');

const orderSchema = new mongoose.Schema({

    orderNumb: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    tableCode: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ['in-progress', 'completed'],
        default: 'in-progress',
        required: true
    },
    menuItems: {
        type: [
            {
                menuItemID: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Menu',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        required: true
    },

},
    {
        collection: 'Order'
    }
);

module.exports = mongoose.model('Order', orderSchema);