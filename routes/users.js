const express = require('express');
const Users = require('../models/users');

const usersRouter = express.Router();

usersRouter.use(express.json());

//SETTING THE METHODS REQUEST

//defining the route
usersRouter.route('/')

//Get Users
.get((req,res,next)=>{
  Users.find({}).then((users)=>{
    res.status(200).send({
      success: true,
      message: "Users retrieved successfully",
      users: users
    });
    res.setHeader('content-type', 'aplication/json');
    res.json(users)
  })
  .catch((err)=>{
    res.status(404).send({
      success: false,
      message: "Users not Found",
      error: err
    });
  })
})




module.exports = usersRouter;
