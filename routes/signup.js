const express = require('express'); //Express modules
const Users = require('../models/users'); //User's model

const singUpRouter = express.Router();//Route Handler
singUpRouter.use(express.json()); //Express Request Body Parser


/* GET users  */
singUpRouter.get('/', function (req, res, next) {
    res.status(400).send('GET Request are not Allowed');
});

/* POST user*/
singUpRouter.post('/', (req, res, next) => {
    Users.findOne({username: req.body.username})
        .then((user) => {
            if (user != null) {
                res.status(404).send({
                    success: false,
                    message: `User ${req.body.username} already exist`
                })
            } else {
                if (!req.body.username) {
                    res.status(403).send({
                        success: false,
                        message: 'Username is Required'
                    })
                }

                if (!req.body.password) {
                    res.status(403).send({
                        success: false,
                        message: 'Password is Required'
                    })
                }


                if (!req.body.email) {
                    res.status(403).send({
                        success: false,
                        message: 'Email is Required'
                    })
                }

               return Users.create({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    name: req.body.name,
                    phone: req.body.phone,
                    address: req.body.address,
                    city: req.body.city,
                    zipcode: req.body.zipcode,
                    country: req.body.country,
                    type: req.body.type
                })
            }
        })

        .catch((err) => {
            res.status(401).send({
                success: false,
                message: 'There was an error, please check your info',
                err : next(err)
            })
        })
});
//PUT Operations
singUpRouter.put('/', function (req, res, next) {
    res.status(400).send('PUT Request are not Allowed');
});

//DELETE Operations
singUpRouter.delete('/', function (req, res, next) {
    res.status(400).send('Delete Request are not Allowed');
});


module.exports = singUpRouter;
