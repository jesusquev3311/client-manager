const express = require('express');
const Sales = require('../models/sales');

const salesRouter = express.Router();

salesRouter.use(express.json());

//SETTING THE CONTROLLER METHODS

//Routes
//All Sales
salesRouter.route('/')

//Get All
.get((req,res,next)=>{
    Sales.find({}).then((sales)=>{
        res.status(200).send({
            success:true,
            message: 'Sales retrieved successfully',
            sales: sales
        })
    }).catch((err)=>{
        res.status(404).send({
            success:false,
            message: 'Sales Not Found',
            err
        })
    })
})

//Create Sale
.post((req,res,next)=>{
    Sales.create(req.body).then((sale)=>{
        if(!req.body.quantity){
            res.status(401).send({
                success:false,
                message: 'Quantity is required'
            })
        }
    
        if(!req.body.amount){
            res.status(401).send({
                success:false,
                message: 'Amount is required'
            })
        }
        res.status(200).send({
            success:true,
            message: 'Sale Added successfully',
            sale: sale
        })
    })
    .catch((err)=>{
        res.status(400).send({
            success:false,
            message: 'Sale Not Added, please check the requirements',
            err
        })
    })
})

//Update Sales
.put((req,res)=>{
    res.status(403).send({
        success: true,
        message: "PUT operations are not allowed in Sales"
    })
})

//Delete All Sales
.delete((req,res,next)=>{
    Sales.remove({}).then((response)=>{
        res.status(200).send({
            success: true,
            message: 'All Products removed successfully',
            response
        })
    })
    .catch((err)=>{
        res.status(400).send({
            success: false,
            message: "something went wrong",
            err
        })
    })
})

module.exports = salesRouter;