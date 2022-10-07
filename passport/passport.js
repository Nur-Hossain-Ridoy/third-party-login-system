const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../model/user')


passport.serializeUser(function (user, done) {
    done(null, user.id)
})
  
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})


passport.use(new GoogleStrategy(
    {
        clientID: "1051547880047-17p8s2ffjsf7v0q685iisknhaiu5hgn1.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:4000/auth/google/callback"
    }, 
    (accessToken, refreshToken, profile, next) => {
        User.findOne({ email: profile._json.email })
        .then(user => {
            if (user) {
                console.log('User already exist in DB', user)
                // cookie token

                next(null, user)
            } else {
                User.create({
                    name: profile._json.name,
                    googleId: profile.id,
                    email: profile._json.email
                })
                .then(user => {
                    console.log('New User', user)
                    next(null, user)
                })
                .catch(err => console.log('this is error', err))
            }
        })
    }
))
