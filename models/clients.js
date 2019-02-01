// USERS DATABASE SCHEMA

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//adding the currency type to mongoose 
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const userbroker = new Schema({
    name: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
});

const userProducts = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 0
    }
});

const clientsSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: false,
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
    brokers:[userbroker],
    company:{
        type: String,
        required: false
    },
    products:[userProducts],
    status:{
        type: String,
        required: true,
        default: 'Good'
    }
}, {
    timestamps: true
});

let Clients = mongoose.model('client', clientsSchema);
module.exports = Clients;



