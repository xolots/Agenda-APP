const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/', async(req, res) => {
    res.render('users/login')
})

// router.get('/regis', async (req, res) => {
//     const user = await new User({'email': 'didi@gmail.com', 'username': 'didi'})
//     const password = 'didi'
//     const newUser = await User.register(user, password)
//     req.login(newUser, (err) => {
//         if(err) return next(err);})
//         req.flash('success', `selamat datang ${req.user.username}`)
//         return res.redirect('/dashboard')
// })


router.post('/', passport.authenticate('local', {failureFlash: true, failureRedirect: '/', keepSessionInfo: true,}), (req,res) => {
    req.flash('success', `Selamat Datang ${req.user.username}`)
    const redirectUrl = req.session.returnTo || "/dashboard";
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

module.exports = router