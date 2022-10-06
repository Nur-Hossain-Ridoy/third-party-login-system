const router = require('express').Router()

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.get('/google', (req, res, next) => {
    res.send('this is login route')
})

module.exports = router