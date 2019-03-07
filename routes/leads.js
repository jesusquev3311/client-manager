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
            if (!req.body.name) {
                res.status(401).send({
                    success: false,
                    message: 'Broker\'s name is required'
                })
            }
            lead.brokers.push(req.body);

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

//Client's notes
 leadsRouter.route('/:leadId/notes')

//Get all notes
    .get((req, res, next) => {
        const leadId = req.params.leadId;

        Leads.findById(leadId).then((lead) => {
            res.status(200).send({
                success: true,
                message: 'Lead\'s notes retrieved',
                notes: lead.notes
            })
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: 'Client not Found'
            })
        })
    })
    //Post note
    .post((req,res,next)=>{
        const leadId = req.params.leadId;

        Leads.findById(leadId).then((lead) => {
            if (lead){
                lead.notes.push({
                    author: req.body.author,
                    description: req.body.description
                });
                lead.save().then((note) => {
                    if(!req.body.author){
                        res.status(400).send({
                            success:false,
                            message: 'Please add an author'
                        })
                    }

                    if(!req.body.description){
                        res.status(400).send({
                            success:false,
                            message: 'Please add a description'
                        })
                    }

                    res.status(200).send({
                        success: true,
                        message:'note added correctly',
                        notes: note
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
                    message: `Client ID : ${leadId} Not Found`
                })
            }
        })
    })

//     //Update notes
    .put((req,res,next)=>{
        res.status(403).send({
            success: true,
            message: 'PUT Operations aren\'t allowed in Leads notes'
        })
    })
//     //Delete notes
    .delete((req,res,next)=>{
        const leadId = req.params.leadId;
        Leads.findById(leadId).then((lead)=>{
            if(lead){
                lead.notes = [];
                lead.save().then((response)=>{
                    res.status(200).send({
                        success:true,
                        message: 'CLient\'s notes Deleted Successfully',
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
                    message: `Client with ID ${leadId} not Found`,
                })
            }

        })
    });

//Leads Single Broker
leadsRouter.route('/:leadId/notes/:noteId')

//get One Client's Broker
    .get((req, res, next) => {
        //get the lead's ID
        const leadId = req.params.leadId;
        //get the brokers ID
        const noteId = req.params.noteId;

        Leads.findById(leadId).then((lead) => {

            if (lead && lead.notes.id(noteId)) {
                res.status(200).send({
                    success: true,
                    message: `note found successfully`,
                    note: lead.notes.id(noteId)
                })
            } else if (!lead) {
                res.status(404).send({
                    success: false,
                    message: `Client with ID ${leadId} Not Found`,
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: `note with ID ${userId} Not Found`
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
//     //Post Broker
    .post((req, res) => {
        res.status(403).send({
            success: true,
            message: 'Post Operations aren\'t allowed in Lead\'s note'
        })
    })

    //Update single Broker
    .put((req, res, next) => {
        const leadId = req.params.leadId;
        Leads.findById(leadId).then((lead) => {
            const noteId = req.params.noteId;
            if (lead && lead.notes.id(noteId)) {
                
                lead.save().then((result) => {
                    res.status(200).send({
                        success: true,
                        message: 'note updated',
                        note: result.notes.id(noteId)
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
                    message: 'Client or note no Found'
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

//     //Delete One Client
    .delete((req, res, next) => {
        const leadId = req.params.leadId;
        Leads.findById(leadId).then((lead) => {
            const noteId = req.params.noteId;
            if (lead && lead.notes.id(noteId)) {
                lead.notes.id(noteId).remove();
                lead.save().then((note) => {
                    res.status(200).send({
                        success: true,
                        message: `Client's note with ID: ${noteId} deleted`,
                        note
                    })
                }).catch((err) => {
                    res.status(404).send({
                        success: false,
                        message: 'note not Found',
                        err
                    })
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Client or note no Found'
                })
            }
        })
    });


module.exports = leadsRouter;
