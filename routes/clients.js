const express = require('express');
const Clients = require('../models/clients');

const clientsRouter = express.Router();

clientsRouter.use(express.json());

//SETTING THE METHODS REQUEST

//defining the route
clientsRouter.route('/')

//Get Clients
.get((req,res,next)=>{
  Clients.find({}).then((clients)=>{
    res.setHeader('content-type', 'aplication/json');
    res.status(200).send({
      success: true,
      message: "Clients retrieved successfully",
      clients: clients
    });
  })
  .catch((err)=>{
    res.status(404).send({
      success: false,
      message: "Clients not Found",
      error: err
    });
  })
})

//Create client
.post((req,res,next)=>{
    Clients.create(req.body).then((client) =>{
      res.status(200).send({
        success: true,
        message: 'Client created successfully',
        client: client
      });
    }).catch((err)=>{
      res.status(400).send({
        success:false,
        message: 'something went wrong, Error',
        error: err
      })
    })
})

//Update Clients
.put((req,res)=>{
  res.status(403).send({
    success: true,
    message: 'PUT Operations aren\'t allowed in Clients'
  })
})

//Delete Clients - !! warning this will delete all Clients from collection !!
.delete((req, res, next)=>{
  Clients.remove({}).then((response)=>{
    res.status(200).send({
      success: true,
      message: 'Clients Deleted Successfully'
    });
  })
  .catch((err)=>{
    res.status(400).send({
      success: false,
      message: 'Couldn\'t delete Clients, something went wrong !!',
      error: err
    })
  })
})

// Clients Methods

clientsRouter.route('/:clientId')

//Get one Client
.get((req,res,next)=>{
  //get the clientId
  const clientId = req.params.clientId;
  Clients.findById(clientId).then((client)=>{
    res.status(200).send({
      success: true,
      message: `Client name: ${client.name} - ID: ${client._id} retrieved successfully`,
      client: client
    })
  }).catch((err)=>{
    res.status(404).send({
      success:false,
      message: `client with ID: ${clientId} Not Found !`,
      error: err
    })
  })
})
// Update One Client
.put((req,res,next)=>{
  //get client Id
  const clientId = req.params.clientId;
  Clients.findByIdAndUpdate(clientId, { $set: req.body } ,{new: true})
  .then((client)=>{
    res.status(200).send({
      success: true,
      message: `client with ID: ${clientId} updated`,
      update: client
    })
    .catch((err)=>{
      res.status(404).send({
        success: false,
        message: "client Not Found",
        error: err
      })
    });
  })
})

//Delete One Client
.delete((req,res,next)=>{
  const clientId = req.params.clientId;
  Clients.findByIdAndRemove(clientId).then((response)=>{
    res.status(200).send({
      success: true,
      message: `client with ID: ${clientId} Deleted successfully !!`
    });
  }).catch((err)=>{
    res.status(404).send({
      success: false,
      message: `client with ID: ${clientId} Not Found`,
      error: err
    })
  })
})

//Client's Brokers
clientsRouter.route('/:clientId/brokers')

//Get brokers
.get((req,res,next)=>{
  const clientId = req.params.clientId;
  Clients.findById(clientId).then((client)=>{
    res.status(200).send({
      success: true,
      message: `Client name: ${client.name} - ID: ${client._id} - broker: ${client.broker} retrieved successfully`,
      client: client
    })
  }).catch((err)=>{
    res.status(404).send({
      success:false,
      message: `client with ID: ${clientId} Not Found !`,
      error: err
    })
  })
})

//Post Brokers
//Create client
.post((req,res,next)=>{
  const clientId = req.params.clientId;
  Clients.findById(clientId).then((client) =>{
    res.status(200).send({
      success: true,
      message: 'Client created successfully',
      broker: client.brokers.push(req.body)
    });
  }).catch((err)=>{
    res.status(404).send({
      success:false,
      message: 'Client Not Found',
      error: err
    })
  })
})





module.exports = clientsRouter;
