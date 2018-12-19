var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            process.nextTick(function() {

                User.findOne({
                    'email': req.body.email
                }, function(err, user) {

                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false);
                    } else {

                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.firstname = req.body.name
                        newUser.lastname = req.body.lastname
                        newUser.contact = req.body.number
                        let date = new Date()
                        newUser.registertime = date.toDateString() 

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            User.findOne({
                'email': email
            }, function(err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false); // req.flash is the way to set flashdata using connect-flash

                if (!user.validPassword(password))
                    return done(null, false); // create the loginMessage and save it to session as flashdata

                return done(null, user);
            });
        }));

};