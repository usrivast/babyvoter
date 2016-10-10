var express     = require('express');
var passport = require('passport');
var path        = require('path');
var favicon     = require('static-favicon');
var dbConfig    = require('./db.js');
var mongoose    = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var logger      = require('morgan');
var methodOverride = require('method-override');
var _           = require('lodash');
var expressSession = require('express-session');
var jwt         = require("jsonwebtoken");
var router      = express.Router();
var authHelper  = require('./controllers/AuthHelper');
var cors = require('cors');
// var dotenv      = require('dotenv');

var BearerStrategy = require('passport-http-bearer').Strategy
var FacebookStrategy = require('passport-facebook').Strategy


// Create the application.
var app = express();

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
// dotenv.load({ path: '.env' });

app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());

app.use(cors());

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
// app.use(morgan('dev')); // log every request to the console

process.on('uncaughtException', function(err) {
    console.log(err);
});

//facebook auth setup
options = {
    clientID: '609091159257057',
    clientSecret: '2e28ec2f26a0ae6794d8a8a26dbdad61',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName','name', 'emails', 'gender', 'photos']
};


app.models = require('./models/index');
var User = mongoose.model('User', app.models.user);

// app.models.user.statics.findOrCreate = function(filters, cb) {
//     User = this;
//     this.find(filters, function(err, results) {
//         if(results.length == 0) {
//             var newUser = new User();
//             newUser.facebookId = filters.facebookId;
//             newUser.save(function(err, doc) {
//                 cb(err, doc)
//             });
//         } else {
//             cb(err, results[0]);
//         }
//     });
// };

passport.use(
    new FacebookStrategy(
        options,
        function(accessToken, refreshToken, profile, done) {
            //check user table for anyone with a facebook ID of profile.id
            User.findOne({
                'facebook.id': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                    // profileFields: ['id', 'displayName','name', 'emails', 'gender', 'photos']

                    user = new User({
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.username,
                        provider: 'facebook',
                        //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                        facebook: profile._json,
                        token: jwt.sign(profile.displayName, "mysecret")
                });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    //found user. Return
                    return done(err, user);
                }
            });
            // User.findOrCreate(
            //     {
            //         facebookId: profile.id
            //     },
            //     function (err, result) {
            //         if(result) {
            //             result.access_token = accessToken;
            //             result.save(function(err, doc) {
            //                 done(err, doc);
            //             });
            //         } else {
            //             done(err, result);
            //         }
            //     }
            // );
        }
    )
);

app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { session: false, scope: [] })
);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: "http://localhost:9000/" }),
    function(req, res) {
        // var token = jwt.sign(req.user, "mysecret");
        // res.redirect("/client/index.html?sid="+token);

        // var token = req.user.access_token;
        // res.set("token",token);
        // res.redirect("http://localhost:63342/sessionless-token-auth-with-express/client/web.html");
        // res.json({token : token});
        res.redirect("http://localhost:9000/#/?sid=" + req.user.token);
    }
);

app.get(
    '/',
    function(req, res) {
        res.send('<a href="/auth/facebook">Log in</a>');
    }
);

app.get(
    '/api/',
    passport.authenticate('bearer', { session: false }),
    function(req, res, next) {
        next();
        // res.redirect("http://localhost:8080?"+"sid=34534543");
        // res.send("LOGGED IN as " + req.user.facebookId + " - <a href=\"/logout\">Log out</a>");
    }
);

app.get(
    '/api/me',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        // res.redirect("http://localhost:9000?"+"sid=34534543");
        // res.send("LOGGED IN as " + req.user.facebookId + " - <a href=\"/logout\">Log out</a>");

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

    }
);

//token auth setup
passport.use(
    new BearerStrategy(
        function(token, done) {
            User.findOne({ token: token },
                function(err, user) {
                    if(err) {
                        return done(err)
                    }
                    if(!user) {
                        return done(null, false)
                    }

                    return done(null, user, { scope: 'all' })
                }
            );
        }
    )
);

// Connect to MongoDB
mongoose.connect(dbConfig.url);
mongoose.connection.once('open', function () {
    // Load the models.
    app.models = require('./models/index');

    logger('models == '+app.models);

    // app.use('/api/', authHelper.ensureAuthorized);

    var routes = require('./routes');
    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });

    console.log('Listening on port 3000...');
    app.listen(3000);
});
