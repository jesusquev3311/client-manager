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

// User Methods

usersRouter.route('/:userId')

//Get one user
.get((req,res,next)=>{
  //get the userId
  const userId = req.params.userId;
  Users.findById(userId).then((user)=>{
    res.status(200).send({
      success: true,
      message: `User name: ${user.name} - ID: ${user._id} retrieved successfully`,
      user: user
    })
  }).catch((err)=>{
    res.status(404).send({
      success:false,
      message: `User with ID: ${userId} Not Found !`,
      error: err
    })
  })
})
// Update One User
.put((req,res,next)=>{
  //get user Id
  const userId = req.params.userId;
  Users.findByIdAndUpdate(userId, { $set: req.body } ,{new: true})
  .then((user)=>{
    res.status(200).send({
      success: true,
      message: `User with ID: ${userId} updated`,
      update: user
    })
    .catch((err)=>{
      res.status(404).send({
        success: false,
        message: "User Not Found",
        error: err
      })
    });
  })
})

//Delete One User
.delete((req,res,next)=>{
  const userId = req.params.userId;
  Users.findByIdAndRemove(userId).then((response)=>{
    res.status(200).send({
      success: true,
      message: `User with ID: ${userId} Deleted successfully !!`
    });
  }).catch((err)=>{
    res.status(404).send({
      success: false,
      message: `User with ID: ${userId} Not Found`,
      error: err
    })
  })
})





module.exports = usersRouter;
