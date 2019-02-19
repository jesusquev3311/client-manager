// USERS DATABASE SCHEMA

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
      type: String,
      required: true ,
      unique: true
    },
    password: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false,
        default: 'noimage.png'
    },
    name : {
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
        required: false
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



