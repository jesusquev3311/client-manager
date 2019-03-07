const express = require('express');
const Users = require('../models/users');
const logoutRouter = express.Router();

logoutRouter.use(express.json());

//User Logout
logoutRouter.get('/', (req,res,next) =>{
    if(req.session){
        req.session.destroy();
        res.clearCookie('session-id');
        // res.redirect('/');
    } else {
        res.status(403).send({
            success: false,
            message: 'You\'re Not Logged In',
        })
    }
});

module.exports = logoutRouter;
