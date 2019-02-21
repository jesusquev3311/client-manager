const express = require('express');
const passport = require('passport');
const Users = require('../models/users');
const loginRouter = express.Router();

loginRouter.use(express.json());

//User Login
loginRouter.post('/', passport.authenticate('local'),(req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'You are successfully logged in!'});
});

module.exports = loginRouter;

