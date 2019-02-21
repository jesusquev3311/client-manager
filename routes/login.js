const express = require('express');
const passport = require('passport');
const Users = require('../models/users');
const loginRouter = express.Router();

loginRouter.use(express.json());

//User Login
loginRouter.post('/', passport.authenticate('local'),(req,res)=>{
    res.status(200).send({
        succes: true,
        status: "You've Logged in Successfully"
    })
});

module.exports = loginRouter;

