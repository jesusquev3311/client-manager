const express = require('express');
const Users = require('../models/users');
const loginRouter = express.Router();

loginRouter.use(express.json());

//User Login
loginRouter.post('/', (req,res,next)=>{
    if(!req.session.user){
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];
        Users.findOne({username: req.body.username})
        .then((user)=>{
            if (!user || user.password !== password){
                res.status(404).send({
                    success: false,
                    message: "Invalid Username or Password"
                })
            } else if(user.username === username && user.password === password){
                res.status(200).send({
                    success: true,
                    message: 'Logged in successfully',
                });
                req.session.user ='authenticated'
            }
        })
            .catch((err)=>{
                console.log(err);
                next(err);
            })
    } else {
        res.status(200).send({
            success:true,
            message: 'You\'re Already Logged in'
        })
    }
});

module.exports = loginRouter;

