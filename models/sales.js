const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    quantity:{
        type: Number,
        required: true,
        default: 0
    },
    Amount:{
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const Sales = mongoose.model('sale', salesSchema);

module.exports = Sales;