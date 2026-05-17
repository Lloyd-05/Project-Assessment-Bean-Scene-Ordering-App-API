const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    area: {
        type: String,
        enum: ['main', 'outside', 'balcony'],
        required: true
    },
    tableCode: {
        type: String,
        required: true,
        unique: true
    }

});

module.exports = mongoose.model('Table', tableSchema);