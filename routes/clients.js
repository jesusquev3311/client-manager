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
});

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
      message: `Client name: ${client.name} - ID: ${client._id} - brokers retrieved successfully`,
      Brokers: client.brokers
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
//Create client broker
.post((req,res,next)=>{
  const clientId = req.params.clientId;
  Clients.findById(clientId).then((client) =>{
    client.brokers.push(req.body);
    if(!req.body.name){
        res.status(401).send({
            success:false,
            message: 'Broker\'s name is required'
        })
    } else if(!req.body.userId){
        res.status(401).send({
            success:false,
            message: 'Broker\'s userId is required'
        })
    }
    client.save().then((broker) =>{
        res.status(200).send({
            success: true,
            message: 'Client created successfully',
            broker: broker
        });
    }).catch((err)=>{
        console.log(err);

    });
  }).catch((err)=>{
    res.status(404).send({
      success:false,
      message: 'Client Not Found',
      error: err
    })
  })
})
//Update Brokers
.put((req,res)=>{
  res.status(403).send({
    success: true,
    message: 'PUT Operations aren\'t allowed in Clients brokers'
  })
})

//Delete Client's Brokers
.delete((req,res,next)=>{
  const clientId = req.params.clientId;
  Clients.findById(clientId).then((client)=>{
    if (client) {
      client.brokers = [];
      client.save().then((response)=>{
        res.status(200).send({
            success:true,
            message: 'Brokers removed',
            response
        });
      })

    }
  }).catch((err)=>{
    res.status(404).send({
      success:false,
      message: 'Something went wrong - please try again',
      err
    })
  });

});

//Clients Single Broker
clientsRouter.route('/:clientId/brokers/:userId')

//get One Client's Broker
    .get((req,res,next)=>{
      //get the client's ID
      const clientId = req.params.clientId;
      //get the brokers ID
      const userId = req.params.userId;

      Clients.findById(clientId).then((client)=>{
          console.log(userId);
          if (client && client.brokers.id(userId)){
          res.status(200).send({
            success: true,
            message: `Broker found successfully`,
            broker: client.brokers.id(userId)
          })
        } else if(!client) {
          res.status(404).send({
            success: false,
            message: `Client with ID ${clientId} Not Found`,
          })
        } else {
          res.status(404).send({
            success: false,
            message: `Broker with ID ${userId} Not Found`
          })
        }
      }).catch((err)=>{
        res.status(400).send({
          success: false,
          messega: 'Something Went Wrong',
          err
        })
      })
    })






module.exports = clientsRouter;
