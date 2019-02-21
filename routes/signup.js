const express = require('express'); //Express modules
const passport = require('passport');
const Users = require('../models/users'); //User's model

const singUpRouter = express.Router();//Route Handler
singUpRouter.use(express.json()); //Express Request Body Parser


/* GET users  */
singUpRouter.get('/', function (req, res, next) {
    res.status(400).send('GET Request are not Allowed');
});

/* POST user*/
singUpRouter.post('/', (req, res, next) => {
    Users.register(new Users({username: req.body.username,email: req.body.email,name: req.body.name}), req.body.password, (err, user) => {
        if (err) {
            res.status(500).send({
                success: false,
                err: err
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
            if (!req.body.name) {
                res.status(403).send({
                    success: false,
                    message: 'Email is Required'
                })
            }
            passport.authenticate('local')(req, res, () => {
                res.status(200).send({
                    success: true,
                    status: "Registration Successfully"
                })
            })
        }
    });
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
