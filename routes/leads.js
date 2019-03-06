const express = require('express');
const Leads = require('../models/leads');

const leadsRouter = express.Router();

leadsRouter.use(express.json());

//SETTING THE METHODS REQUEST

//defining the route
leadsRouter.route('/')

//Get Leads
    .get((req, res, next) => {
        Leads.find({}).then((leads) => {
            res.setHeader('content-type', 'aplication/json');
            res.status(200).send({
                success: true,
                message: "Leads retrieved successfully",
                leads: leads
            });
        })
            .catch((err) => {
                res.status(404).send({
                    success: false,
                    message: "Leads not Found",
                    error: err
                });
            })
    })

    //Create lead
    .post((req, res, next) => {
        Leads.create(req.body).then((lead) => {
            res.status(200).send({
                success: true,
                message: 'Client created successfully',
                leads: lead
            });
        }).catch((err) => {
            res.status(400).send({
                success: false,
                message: 'something went wrong, Error',
                error: err
            })
        })
    })

    //Update Leads
    .put((req, res) => {
        res.status(403).send({
            success: true,
            message: 'PUT Operations aren\'t allowed in Leads'
        })
    })

    //Delete Leads - !! warning this will delete all Leads from collection !!
    .delete((req, res, next) => {
        Leads.remove({}).then((response) => {
            res.status(200).send({
                success: true,
                message: 'Leads Deleted Successfully',
                response
            });
        })
            .catch((err) => {
                res.status(400).send({
                    success: false,
                    message: 'Couldn\'t delete Leads, something went wrong !!',
                    error: err
                })
            })
    });

// Leads Methods

leadsRouter.route('/:leadId')

//Get one Client
    .get((req, res, next) => {
        //get the leadId
        const leadId = req.params.leadId;
        Leads.findById(leadId).then((lead) => {
            res.status(200).send({
                success: true,
                message: `Lead name: ${lead.name} - ID: ${lead._id} retrieved successfully`,
                lead: lead
            })
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: `lead with ID: ${leadId} Not Found !`,
                error: err
            })
        })
    })
    // Update One Client
    .put((req, res, next) => {
        //get lead Id
        const leadId = req.params.leadId;
        Leads.findByIdAndUpdate(leadId, {$set: req.body}, {new: true})
            .then((lead) => {
                res.status(200).send({
                    success: true,
                    message: `lead with ID: ${leadId} updated`,
                    update: lead
                })
                    .catch((err) => {
                        res.status(404).send({
                            success: false,
                            message: "lead Not Found",
                            error: err
                        })
                    });
            })
    })

    //Delete One Client
    .delete((req, res, next) => {
        const leadId = req.params.leadId;
        Leads.findByIdAndRemove(leadId).then((response) => {
            res.status(200).send({
                success: true,
                message: `lead with ID: ${leadId} Deleted successfully !!`,
                response
            });
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: `lead with ID: ${leadId} Not Found`,
                error: err
            })
        })
    })

//Client's Brokers
leadsRouter.route('/:leadId/brokers')

//Get brokers
    .get((req, res, next) => {
        const leadId = req.params.leadId;
        Leads.findById(leadId).then((lead) => {
            res.status(200).send({
                success: true,
                message: `Client name: ${lead.name} - ID: ${lead._id} - brokers retrieved successfully`,
                Brokers: lead.brokers
            })
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: `lead with ID: ${leadId} Not Found !`,
                error: err
            })
        })
    })

    //Post Brokers
    //Create lead broker
    .post((req, res, next) => {
        const leadId = req.params.leadId;
        Leads.findById(leadId).then((lead) => {
            lead.brokers.push(req.body);
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
            lead.save().then((broker) => {
                res.status(200).send({
                    success: true,
                    message: 'Client created successfully',
                    broker: broker.brokers
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
            message: 'PUT Operations aren\'t allowed in Leads brokers'
        })
    })

    //Delete Client's Brokers
    .delete((req, res, next) => {
        const leadId = req.params.leadId;
        Leads.findById(leadId).then((lead) => {
            if (lead) {
                lead.brokers = [];
                lead.save().then((response) => {
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

//Leads Single Broker
leadsRouter.route('/:leadId/brokers/:userId')

//get One Client's Broker
    .get((req, res, next) => {
        //get the lead's ID
        const leadId = req.params.leadId;
        //get the brokers ID
        const userId = req.params.userId;

        Leads.findById(leadId).then((lead) => {
            console.log(userId);
            if (lead && lead.brokers.id(userId)) {
                res.status(200).send({
                    success: true,
                    message: `Broker found successfully`,
                    broker: lead.brokers.id(userId)
                })
            } else if (!lead) {
                res.status(404).send({
                    success: false,
                    message: `Client with ID ${leadId} Not Found`,
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
            message: 'Post Operations aren\'t allowed in Leads brokers'
        })
    })

    //Update single Broker
    .put((req, res, next) => {
        const leadId = req.params.leadId;
        Leads.findById(leadId).then((lead) => {
            const userId = req.params.userId;
            if (lead && lead.brokers.id(userId)) {
                if (req.body.name) {
                    lead.brokers.id(userId).name = req.body.name
                } else if (req.body.userId) {
                    lead.brokers.id(userId).userId = req.body.userId
                }
                lead.save().then((broker) => {
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

    //Delete One Broker
    .delete((req, res, next) => {
        const leadId = req.params.leadId;
        Leads.findById(leadId).then((lead) => {
            const userId = req.params.userId;
            if (lead && lead.brokers.id(userId)) {
                lead.brokers.id(userId).remove();
                lead.save().then((broker) => {
                    res.status(200).send({
                        success: true,
                        message: `Lead's broker with ID: ${userId} deleted`,
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
                    message: 'Lead or Broker no Found'
                })
            }
        })
    });

//Client's Products
// leadsRouter.route('/:leadId/products')
//
// //Get all products
//     .get((req, res, next) => {
//         const leadId = req.params.leadId;
//
//         Leads.findById(leadId).then((lead) => {
//             res.status(200).send({
//                 success: true,
//                 message: 'Lead\'s products retrieved',
//                 products: lead.products
//             })
//         }).catch((err) => {
//             res.status(404).send({
//                 success: false,
//                 message: 'Client not Found'
//             })
//         })
//     })
//     //Post product
//     .post((req,res,next)=>{
//         const leadId = req.params.leadId;
//
//         Leads.findById(leadId).then((lead) => {
//             if (lead){
//                 lead.products.push(req.body);
//
//                 console.log('Id: ', lead.id);
//                 lead.save().then((product) => {
//
//                     res.status(200).send({
//                         success: true,
//                         message:'Product added correctly',
//                         products: product.products
//                     })
//                 })
//                     .catch((err)=>{
//                         res.status(400).send({
//                             success:false,
//                             message: 'Something went wrong',
//                             err
//                         })
//                     })
//             } else {
//                 res.status(404).send({
//                     success: false,
//                     message: `Client ID : ${leadId} Not Found`
//                 })
//             }
//         })
//     })
//
//     //Update Products
//     .put((req,res,next)=>{
//         res.status(403).send({
//             success: true,
//             message: 'PUT Operations aren\'t allowed in Leads products'
//         })
//     })
//     //Delete Products
//     .delete((req,res,next)=>{
//         const leadId = req.params.leadId;
//         Leads.findById(leadId).then((lead)=>{
//             if(lead){
//                 lead.products = [];
//                 lead.save().then((response)=>{
//                     res.status(200).send({
//                         success:true,
//                         message: 'CLient\'s Products Deleted Successfully',
//                         response
//                     })
//                 }).catch((err)=>{
//                     res.status(400).send({
//                         success:false,
//                         message: 'Something went worng, please try again',
//                         err
//                     })
//                 })
//             } else {
//                 res.status(404).send({
//                     success:false,
//                     message: `Client with ID ${leadId} not Found`,
//                 })
//             }
//
//         })
//     });

//Leads Single Broker
// leadsRouter.route('/:leadId/products/:productId')

//get One Client's Broker
//     .get((req, res, next) => {
//         //get the lead's ID
//         const leadId = req.params.leadId;
//         //get the brokers ID
//         const productId = req.params.productId;
//
//         Leads.findById(leadId).then((lead) => {
//
//             if (lead && lead.products.id(productId)) {
//                 res.status(200).send({
//                     success: true,
//                     message: `Product found successfully`,
//                     Product: lead.products.id(productId)
//                 })
//             } else if (!lead) {
//                 res.status(404).send({
//                     success: false,
//                     message: `Client with ID ${leadId} Not Found`,
//                 })
//             } else {
//                 res.status(404).send({
//                     success: false,
//                     message: `Product with ID ${userId} Not Found`
//                 })
//             }
//         }).catch((err) => {
//             res.status(400).send({
//                 success: false,
//                 messega: 'Something Went Wrong',
//                 err
//             })
//         })
//     })
//
//     //Post Broker
//     .post((req, res) => {
//         res.status(403).send({
//             success: true,
//             message: 'Post Operations aren\'t allowed in Lead\'s Product'
//         })
//     })
//
//     //Update single Broker
//     .put((req, res, next) => {
//         const leadId = req.params.leadId;
//         Leads.findById(leadId).then((lead) => {
//             const productId = req.params.productId;
//             if (lead && lead.products.id(productId)) {
//                 if (req.body.name) {
//                     lead.products.id(productId).name = req.body.name
//                 }
//                 if (req.body.description) {
//                     lead.products.id(productId).description = req.body.description
//                 }
//                 if (req.body.price) {
//                     lead.products.id(productId).price = req.body.price
//                 }
//                 if (req.body.quantity) {
//                     lead.products.id(productId).quantity = req.body.quantity
//                 }
//                 lead.save().then((result) => {
//                     res.status(200).send({
//                         success: true,
//                         message: 'Product updated',
//                         Product: result.products.id(productId)
//                     })
//                 }).catch((err) => {
//                     res.status(401).send({
//                         success: false,
//                         message: 'Please check the info - something went wrong',
//                         err
//                     })
//                 })
//             } else {
//                 res.status(404).send({
//                     success: false,
//                     message: 'Client or Product no Found'
//                 })
//             }
//         }).catch((err) => {
//             res.status(400).send({
//                 success: false,
//                 message: 'Something Went Wrong',
//                 err
//             })
//         })
//     })
//
//     //Delete One Client
//     .delete((req, res, next) => {
//         const leadId = req.params.leadId;
//         Leads.findById(leadId).then((lead) => {
//             const productId = req.params.productId;
//             if (lead && lead.products.id(productId)) {
//                 lead.products.id(productId).remove();
//                 lead.save().then((product) => {
//                     res.status(200).send({
//                         success: true,
//                         message: `Client's Product with ID: ${productId} deleted`,
//                         product
//                     })
//                 }).catch((err) => {
//                     res.status(404).send({
//                         success: false,
//                         message: 'Product not Found',
//                         err
//                     })
//                 })
//             } else {
//                 res.status(404).send({
//                     success: false,
//                     message: 'Client or Product no Found'
//                 })
//             }
//         })
//     });


module.exports = leadsRouter;
