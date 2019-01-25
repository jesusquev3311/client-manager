// USERS DATABASE SCHEMA

const mongoose = require('mongoose');
const Schema = mongoose.schema;

const contacsSchema = new Schema({
    name : {
        type: String,
        required: true,
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
    }
}, {
    timestamp: true
});

let Contacts = mongoose.model('contact', usersSchema);
module.exports = Contacts;



