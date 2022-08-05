const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const {IsLoggedIn} = require('../middleware')

router.get('/',IsLoggedIn, (req, res) => {
    res.render('users/register')
})

router.post('/',IsLoggedIn,async (req, res, next) => {
    try{
    const {email, username, password} = req.body
    const user = await new User({email, username})
    const newUser = await User.register(user, password)
    req.login(newUser, (err) => {
        if(err) return next(err);
        req.flash('success', `Selamat Datang ${newUser.username}`)
        res.redirect('/dashboard')
    })

    }catch (e){
        req.flash('error', e.message)
        res.redirect('/register')
    }
})

module.exports = router