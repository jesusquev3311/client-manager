// USERS DATABASE SCHEMA

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode:{
        type: Number,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'broker'
    }
}, {
    timestamps: true
});

let Users = mongoose.model('user', usersSchema);
module.exports = Users;



