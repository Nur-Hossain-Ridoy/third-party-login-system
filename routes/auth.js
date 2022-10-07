const router = require('express').Router()
const passport = require('passport')

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.get('/logout', (req, res, next) => {
    req.logOut()
    res.redirect('/auth/login')
})

router.get('/google/callback', passport.authenticate('google'), (req, res, next) => {
    res.send(req.user)
})

router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}), (req, res, next) => {
    res.send('this is login route')
})

module.exports = router