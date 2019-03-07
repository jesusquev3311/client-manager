// USERS DATABASE SCHEMA

const mongoose = require('mongoose');
//adding the currency type to mongoose 
const Schema = mongoose.Schema;

const userbroker = new Schema({
    name: {
        type: String,
        required: false
    }
});

const leadsnotes = new Schema({
    author:{
        type: String,
        required: false
    },
    description: {
        type: String,
        required:false
    }
},{timestamps: true});


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
        type: String,
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
    broker:[userbroker],
    company:{
        type: String,
        required: false
    },
    notes:[leadsnotes],
    status:{
        type: String,
        required: true,
        default: 'Started',
        unique: false
    }
}, {
    timestamps: true
});

let Leads = mongoose.model('lead', leadsSchema);
module.exports = Leads;



