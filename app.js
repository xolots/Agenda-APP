const express = require('express')
const mongoose = require('mongoose')
const Agenda = require('./models/agendaSchema')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const path = require('path')
const app = express();
const session = require('express-session')
const port = process.env.PORT || 3000
const passport = require('passport')
const User = require('./models/user')
const LocalStrategy = require('passport-local')
const index = require('./routes/index')
const login = require('./routes/login')
const month = require('./routes/month')
const year = require('./routes/year')
const register = require('./routes/register')
const status = require('./routes/status')
const yearMonth = require('./routes/yearMonth')
const Category = require('./routes/category')


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
const sessionSetting = {
    secret: 'thisismysecretpassword',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionSetting))
app.use(flash())

app.use((req, res, next) => {

    // res.locals.IsCurrentUser = req.user.username
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')

    next()
})

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dashboard', index)
app.use('/dashboard/register', register)
app.use('/dashboard/month', month)
app.use('/dashboard/year', year)
app.use('/dashboard/status', status)
app.use('/dashboard/tanggal', yearMonth)
app.use('/dashboard/category', Category)

app.use('/', login)


app.use('*', (req, res, next) => {
    res.render('404')
})

app.listen(port, () => {
    console.log('server berjalan pada port 3000')
})