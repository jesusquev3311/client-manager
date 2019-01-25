// USERS DATABASE SCHEMA

const mongoose = require('mongoose');
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
        
    }

});

const clientsSchema = new Schema({
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


    
}, {
    timestamp: true
});

let Clients = mongoose.model('client', clientsSchema);
module.exports = Clients;



