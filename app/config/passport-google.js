var passport = require('passport'),
    strategy = require('passport-strategy'),
    googleStrategy = require('passport-google-oauth20').Strategy,
    User = require('../models/user')

passport.use(new googleStrategy({
    clientID: '814834987599-brlil96uegtl63a95jfpu3c3gdtiinja.apps.googleusercontent.com',
    clientSecret: 'Q3V0RInphMLpj_XMgYWcp3uM',
    callbackURL: 'http://localhost:3000/auth/googlecallback'
}, async(accessToken, refreshToken, profile, cb) => {
    const ExistingUser = await User.findOne({
        "userID": profile.id
    })

    if (ExistingUser) {
        return cb(null, ExistingUser)
    }
    const NewUser = new User() 
    	  NewUser.userID = profile.id
    	  NewUser.firstname = profile.name.givenName
    	  NewUser.lastname = profile.name.familyName
    const newuser = await NewUser.save()

    cb(null,newuser)
}))