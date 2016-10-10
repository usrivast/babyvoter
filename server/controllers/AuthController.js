var mongoose = require('mongoose');
var authHelper = require('./AuthHelper');
var dbconfig = require('../db');
var jwt = require('jsonwebtoken');
module.exports = function(app, route) {

    app.get('/api/me', authHelper.ensureAuthorized , function(req, res) {
        var User = mongoose.model('User', app.models.user);

        User.findOne({token: req.headers.token}, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                user.password = '';
                res.json({
                    type: true,
                    data: user
                });
            }
        });
    });

    app.post('/authenticate', function(req, res) {
        var User = mongoose.model('User', app.models.user);
        var newUser = new User();
        // var hashPassword = newUser.hashPassword(req.body.password);
        User.findOne({email: req.body.email}, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    newUser = new User(user);
                    if (newUser.authenticate(req.body.password)) {
                        if (typeof user.token === 'undefined') {
                            user.token = jwt.sign(user, dbconfig.token_secret);
                            user.update(function (err, user1) {
                                res.json({
                                    type: true,
                                    data: user1,
                                    token: user1.token
                                });
                            });
                        } else {
                            res.json({
                                type: true,
                                data: user,
                                token: user.token
                            });
                        }
                    } else {
                        res.json({
                            type: false,
                            data: "Incorrect email/password"
                        });
                    }
                } else {
                    res.json({
                        type: false,
                        data: "Incorrect email/password"
                    });
                }
            }
        });
    });

    app.post('/signin', function(req, res) {
        var User = mongoose.model('User', app.models.user);
        User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    res.json({
                        type: false,
                        data: "User already exists!"
                    });
                } else {
                    var userModel = new User();
                    userModel.email = req.body.email;
                    userModel.password = req.body.password;
                    userModel.username = req.body.username;
                    userModel.firstName = req.body.firstName;
                    userModel.lastName = req.body.lastName;
                    userModel.displayName = req.body.displayName;
                    userModel.save(function(err, user) {
                        if(err){
                            res.json({
                                type: false,
                                data: "Error occured: " + err
                            });
                        }else {
                            user.token = jwt.sign(user, dbconfig.token_secret);
                            user.save(function (err, user1) {
                                res.json({
                                    type: true,
                                    data: user1,
                                    token: user1.token
                                });
                            });
                        }
                    })
                }
            }
        });
    });



    // Return middleware.
    return function (req, res, next) {
        next();
    };
};

// function ensureAuthorized(req, res, next) {
//     var bearerToken;
//     if (req) {
//         if(req.path==='/authenticate'){
//             next();
//         } else {
//             var bearerHeader = req.headers["authorization"];
//             if (typeof bearerHeader !== 'undefined') {
//                 var bearer = bearerHeader.split(" ");
//                 bearerToken = bearer[1];
//                 req.token = bearerToken;
//                 next();
//             } else {
//                 res.sendStatus(403);
//             }
//         }
//     }
// }