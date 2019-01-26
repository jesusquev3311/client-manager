// USERS DATABASE SCHEMA

const mongoose = require('mongoose');
//adding the currency type to mongoose 
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency
const Schema = mongoose.Schema;

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

const productsSchema = new Schema({
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
        type: currency,
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
    broker:userbroker,
    company:{
        type: String,
        required: false
    },
    products:[productsSchema],
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



