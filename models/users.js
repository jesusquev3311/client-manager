// USERS DATABASE SCHEMA
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const usersSchema = new Schema({
    image:{
        type: String,
        required: false,
        default: 'noimage.png'
    },
    name : {
        type: String,
        required: true
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
usersSchema.plugin(passportLocalMongoose);
let Users = mongoose.model('user', usersSchema);
module.exports = Users;



