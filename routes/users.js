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
    res.setHeader('content-type', 'aplication/json');
    res.status(200).send({
      success: true,
      message: "Users retrieved successfully",
      users: users
    });
  })
  .catch((err)=>{
    res.status(404).send({
      success: false,
      message: "Users not Found",
      error: err
    });
  })
})

//Create user
.post((req,res,next)=>{
    Users.create(req.body).then((user) =>{
      res.status(200).send({
        success: true,
        message: 'User created successfully',
        user: user
      });
    }).catch((err)=>{
      res.status(400).send({
        success:false,
        message: 'something went wrong, Error',
        error: err
      })
    })
})

//Update Users
.put((req,res)=>{
  res.status(403).send({
    success: true,
    message: 'PUT Operations aren\'t allowed in Users'
  })
})

//Delete Users - !! warning this will delete all users from collection !!
.delete((req, res, next)=>{
  Users.remove({}).then((response)=>{
    res.status(200).send({
      success: true,
      message: 'Users Deleted Successfully'
    });
  })
  .catch((err)=>{
    res.status(400).send({
      success: false,
      message: 'Couldn\'t delete Users, something went wrong !!',
      error: err
    })
  })
})






module.exports = usersRouter;
