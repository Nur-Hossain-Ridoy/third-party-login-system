const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const passportConfig = require('./passport/passport')
const passport = require('passport')
const session = require('express-session')
const app = express()

// connection to the database
const DB = async () => {
    await mongoose.connect('mongodb://localhost:27017/google_user')
    console.log('Database Connected');
}
DB()

app.use(session({
    secret: 'mysecretid',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 * 7  // 7 days
    }
}))


app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.use('/auth', auth)


app.use('/', (req, res, next) => {
    res.render('home')
})

app.listen(4000, () => {
    console.log(`Server is up and running on PORT.. 4000`);
})