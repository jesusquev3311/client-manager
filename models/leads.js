// USERS DATABASE SCHEMA

const mongoose = require('mongoose');
//adding the currency type to mongoose 
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency;
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
        required: false,
    },
    description:{
        type: String,
        required: false
    },
    price:{
        type: currency,
        required: false,
        default: 0
    },
    quantity:{
        type: Number,
        required: false,
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
    image:{
      type: String,
      required: false,
      default: 'noimage.png'
    },
    phone:{
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    zipcode:{
        type: Number,
        required: false
    },
    country:{
        type: String,
        required: false
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
    timestamps: true
});

let Leads = mongoose.model('lead', leadsSchema);
module.exports = Leads;



