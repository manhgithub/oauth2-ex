const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');

const authConfig = require('./auth');

const google_options = {
    clientID        : authConfig.googleAuth.clientId,
    clientSecret    : authConfig.googleAuth.clientSecret,
    callbackURL     : authConfig.googleAuth.callBackUrl,
};

const facebook_options = {
    clientID: authConfig.facebookAuth.clientId,
    clientSecret: authConfig.facebookAuth.clientSecret,
    callbackURL: authConfig.facebookAuth.callBackUrl,
    profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'middle_name']
};

function google_callback(token, refreshToken, profile, done) {
    process.nextTick( ()=> {
        // // Find in DB if have this id
        User.findOne({'google.id': profile.id}, (err,user)=> {
            if(err) {
                return done(err,false);
            }
            if(user){
                // if a user is found, log them in
                return done(null, user);
            }
            else {// if the user isnt in our database, create a new user
                // return done(null, false);
                var newUser = new User();
                newUser.google.id    = profile.id;
                newUser.google.token = token;
                newUser.google.name  = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                
                newUser.save( (err)=> {
                    if(err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });

}

function facebook_callback(token, refreshToken, profile, done) {
    process.nextTick(function () {
        User.findOne({ 'google.id': profile.id }, function (err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                var newUser = new User();
                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.name = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.google.email = "No email" ;
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    })
}

module.exports = function(passport){
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use(new GoogleStrategy(google_options, google_callback));
    
    console.log("Passport use facebook stragy");
    passport.use(new FacebookStrategy(facebook_options, facebook_callback));
};