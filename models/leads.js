// USERS DATABASE SCHEMA

const mongoose = require('mongoose');
//adding the currency type to mongoose 
require('mongoose-currency').loadType(moongose);
const currency = moongose.Types.Currency
const Schema = mongoose.schema;

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
        type: string,
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

const leadsSchema = new Schema({
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
        default: 'Started'
    }
}, {
    timestamp: true
});

let Leads = mongoose.model('lead', leadsSchema);
module.exports = Leads;



