const express = require('express');
const Clients = require('../models/clients');

const clientsRouter = express.Router();

clientsRouter.use(express.json());

//SETTING THE METHODS REQUEST

//defining the route
clientsRouter.route('/')

//Get Clients
    .get((req, res, next) => {
        Clients.find({}).then((clients) => {
            res.setHeader('content-type', 'aplication/json');
            res.status(200).send({
                success: true,
                message: "Clients retrieved successfully",
                clients: clients
            });
        })
            .catch((err) => {
                res.status(404).send({
                    success: false,
                    message: "Clients not Found",
                    error: err
                });
            })
    })

    //Create client
    .post((req, res, next) => {
        Clients.create(req.body).then((client) => {
            res.status(200).send({
                success: true,
                message: 'Client created successfully',
                client: client
            });
        }).catch((err) => {
            res.status(400).send({
                success: false,
                message: 'something went wrong, Error',
                error: err
            })
        })
    })

    //Update Clients
    .put((req, res) => {
        res.status(403).send({
            success: true,
            message: 'PUT Operations aren\'t allowed in Clients'
        })
    })

    //Delete Clients - !! warning this will delete all Clients from collection !!
    .delete((req, res, next) => {
        Clients.remove({}).then((response) => {
            res.status(200).send({
                success: true,
                message: 'Clients Deleted Successfully'
            });
        })
            .catch((err) => {
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
    .get((req, res, next) => {
        //get the clientId
        const clientId = req.params.clientId;
        Clients.findById(clientId).then((client) => {
            res.status(200).send({
                success: true,
                message: `Client name: ${client.name} - ID: ${client._id} retrieved successfully`,
                client: client
            })
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: `client with ID: ${clientId} Not Found !`,
                error: err
            })
        })
    })
    // Update One Client
    .put((req, res, next) => {
        //get client Id
        const clientId = req.params.clientId;
        Clients.findByIdAndUpdate(clientId, {$set: req.body}, {new: true})
            .then((client) => {
                res.status(200).send({
                    success: true,
                    message: `client with ID: ${clientId} updated`,
                    update: client
                })
                    .catch((err) => {
                        res.status(404).send({
                            success: false,
                            message: "client Not Found",
                            error: err
                        })
                    });
            })
    })

    //Delete One Client
    .delete((req, res, next) => {
        const clientId = req.params.clientId;
        Clients.findByIdAndRemove(clientId).then((response) => {
            res.status(200).send({
                success: true,
                message: `client with ID: ${clientId} Deleted successfully !!`
            });
        }).catch((err) => {
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
    .get((req, res, next) => {
        const clientId = req.params.clientId;
        Clients.findById(clientId).then((client) => {
            res.status(200).send({
                success: true,
                message: `Client name: ${client.name} - ID: ${client._id} - brokers retrieved successfully`,
                Brokers: client.brokers
            })
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: `client with ID: ${clientId} Not Found !`,
                error: err
            })
        })
    })

    //Post Brokers
    //Create client broker
    .post((req, res, next) => {
        const clientId = req.params.clientId;
        Clients.findById(clientId).then((client) => {
            client.brokers.push(req.body);
            if (!req.body.name) {
                res.status(401).send({
                    success: false,
                    message: 'Broker\'s name is required'
                })
            } else if (!req.body.userId) {
                res.status(401).send({
                    success: false,
                    message: 'Broker\'s userId is required'
                })
            }
            client.save().then((broker) => {
                res.status(200).send({
                    success: true,
                    message: 'Client created successfully',
                    broker: broker
                });
            }).catch((err) => {
                console.log(err);

            });
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: 'Client Not Found',
                error: err
            })
        })
    })
    //Update Brokers
    .put((req, res) => {
        res.status(403).send({
            success: true,
            message: 'PUT Operations aren\'t allowed in Clients brokers'
        })
    })

    //Delete Client's Brokers
    .delete((req, res, next) => {
        const clientId = req.params.clientId;
        Clients.findById(clientId).then((client) => {
            if (client) {
                client.brokers = [];
                client.save().then((response) => {
                    res.status(200).send({
                        success: true,
                        message: 'Brokers removed',
                        response
                    });
                })

            }
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: 'Something went wrong - please try again',
                err
            })
        });

    });

//Clients Single Broker
clientsRouter.route('/:clientId/brokers/:userId')

//get One Client's Broker
    .get((req, res, next) => {
        //get the client's ID
        const clientId = req.params.clientId;
        //get the brokers ID
        const userId = req.params.userId;

        Clients.findById(clientId).then((client) => {
            console.log(userId);
            if (client && client.brokers.id(userId)) {
                res.status(200).send({
                    success: true,
                    message: `Broker found successfully`,
                    broker: client.brokers.id(userId)
                })
            } else if (!client) {
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
        }).catch((err) => {
            res.status(400).send({
                success: false,
                messega: 'Something Went Wrong',
                err
            })
        })
    })

    //Post Broker
    .post((req, res) => {
        res.status(403).send({
            success: true,
            message: 'Post Operations aren\'t allowed in Clients brokers'
        })
    })

    //Update single Broker
    .put((req, res, next) => {
        const clientId = req.params.clientId;
        Clients.findById(clientId).then((client) => {
            const userId = req.params.userId;
            if (client && client.brokers.id(userId)) {
                if (req.body.name) {
                    client.brokers.id(userId).name = req.body.name
                } else if (req.body.userId) {
                    client.brokers.id(userId).userId = req.body.userId
                }
                client.save().then((broker) => {
                    res.status(200).send({
                        success: true,
                        message: 'Broker updated',
                        broker: broker
                    })
                }).catch((err) => {
                    res.status(401).send({
                        success: false,
                        message: 'Please check the info - something went wrong',
                        err
                    })
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Client or Broker no Found'
                })
            }
        }).catch((err) => {
            res.status(400).send({
                success: false,
                message: 'Something Went Wrong',
                err
            })
        })
    })

    //Delete One Client
    .delete((req, res, next) => {
        const clientId = req.params.clientId;
        Clients.findById(clientId).then((client) => {
            const userId = req.params.userId;
            if (client && client.brokers.id(userId)) {
                client.brokers.id(userId).remove();
                client.save().then((broker) => {
                    res.status(200).send({
                        success: true,
                        message: `Client's broker with ID: ${userId} deleted`,
                        broker
                    })
                }).catch((err) => {
                    res.status(400).send({
                        success: false,
                        message: 'Something Went Wrong',
                        err
                    })
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Client or Broker no Found'
                })
            }
        })
    });

//Client's Products
clientsRouter.route('/:clientId/products')

//Get all products
    .get((req, res, next) => {
        const clientId = req.params.clientId;

        Clients.findById(clientId).then((client) => {
            res.status(200).send({
                success: true,
                message: 'Client\'s products retrieved',
                products: client.products
            })
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: 'Client not Found'
            })
        })
    })
//Post product
    .post((req,res,next)=>{
        const clientId = req.params.clientId;

        Clients.findById(clientId).then((client) => {
            if (client){
                client.products.push(req.body);

                console.log('Id: ', client.id);
                client.save().then((product) => {

                    res.status(200).send({
                        success: true,
                        message:'Product added correctly',
                        products: product.products
                    })
                })
                    .catch((err)=>{
                    res.status(400).send({
                        success:false,
                        message: 'Something went wrong',
                        err
                    })
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: `Client ID : ${clientId} Not Found`
                })
            }
        })
    })

//Update Products
    .put((req,res,next)=>{
        res.status(403).send({
            success: true,
            message: 'PUT Operations aren\'t allowed in Clients products'
        })
    })
//Delete Products
    .delete((req,res,next)=>{
        const clientId = req.params.clientId;
        Clients.findById(clientId).then((client)=>{
            if(client){
                client.products = [];
                client.save().then((response)=>{
                    res.status(200).send({
                        success:true,
                        message: 'CLient\'s Products Deleted Successfully',
                        response
                    })
                }).catch((err)=>{
                    res.status(400).send({
                        success:false,
                        message: 'Something went worng, please try again',
                        err
                    })
                })
            } else {
                res.status(404).send({
                    success:false,
                    message: `Client with ID ${clientId} not Found`,
                })
            }

        })
    });

//Clients Single Broker
clientsRouter.route('/:clientId/products/:productId')

//get One Client's Broker
    .get((req, res, next) => {
        //get the client's ID
        const clientId = req.params.clientId;
        //get the brokers ID
        const productId = req.params.productId;

        Clients.findById(clientId).then((client) => {

            if (client && client.products.id(productId)) {
                res.status(200).send({
                    success: true,
                    message: `Product found successfully`,
                    Product: client.products.id(productId)
                })
            } else if (!client) {
                res.status(404).send({
                    success: false,
                    message: `Client with ID ${clientId} Not Found`,
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: `Product with ID ${userId} Not Found`
                })
            }
        }).catch((err) => {
            res.status(400).send({
                success: false,
                messega: 'Something Went Wrong',
                err
            })
        })
    })

    //Post Broker
    .post((req, res) => {
        res.status(403).send({
            success: true,
            message: 'Post Operations aren\'t allowed in Client\'s Product'
        })
    })

    //Update single Broker
    .put((req, res, next) => {
        const clientId = req.params.clientId;
        Clients.findById(clientId).then((client) => {
            const productId = req.params.productId;
            if (client && client.products.id(productId)) {
                if (req.body.name) {
                    client.products.id(productId).name = req.body.name
                }
                if (req.body.description) {
                    client.products.id(productId).description = req.body.description
                }
                if (req.body.price) {
                    client.products.id(productId).price = req.body.price
                }
                if (req.body.quantity) {
                    client.products.id(productId).quantity = req.body.quantity
                }
                client.save().then((result) => {
                    res.status(200).send({
                        success: true,
                        message: 'Product updated',
                        Product: result.products.id(productId)
                    })
                }).catch((err) => {
                    res.status(401).send({
                        success: false,
                        message: 'Please check the info - something went wrong',
                        err
                    })
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Client or Product no Found'
                })
            }
        }).catch((err) => {
            res.status(400).send({
                success: false,
                message: 'Something Went Wrong',
                err
            })
        })
    })

    //Delete One Client
    .delete((req, res, next) => {
        const clientId = req.params.clientId;
        Clients.findById(clientId).then((client) => {
            const productId = req.params.productId;
            if (client && client.products.id(productId)) {
                client.products.id(productId).remove();
                client.save().then((product) => {
                    res.status(200).send({
                        success: true,
                        message: `Client's Product with ID: ${productId} deleted`,
                        product
                    })
                }).catch((err) => {
                    res.status(404).send({
                        success: false,
                        message: 'Product not Found',
                        err
                    })
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Client or Product no Found'
                })
            }
        })
    });


module.exports = clientsRouter;
