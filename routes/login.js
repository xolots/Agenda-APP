const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const {IsLoggedIn} = require('../middleware')
const user = require('../models/user')

router.get('/', async(req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/dashboard')
    }


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

router.get('/logout',IsLoggedIn, (req, res, next) => {
    req.logout(function (err){
        if(err){return next(err);}
        req.flash('success', 'berhasil logout')
        res.redirect('/')
    })
})

router.get('/dashboard/changepass',IsLoggedIn, (req,res) => {
    res.render('users/changepass')
})

router.post('/dashboard/changepass',IsLoggedIn, async(req,res) => {
    const userName = await req.user.username
    const {password} = req.body
    const sanitizedUser = await User.findByUsername(userName);
    try {
      await sanitizedUser.setPassword(password);
      await sanitizedUser.save();
      req.flash('success', 'Berhasil Mengubah Password')
      res.redirect('/dashboard')
    } 
    catch (err) {
      req.flash('success', `${err}`)
      res.redirect('/dashboard/changepass')
    }

})

router.get('/dashboard/changeemail',IsLoggedIn, async(req, res) => {
    const user = req.user
    res.render('users/changeemail', {user})
})

router.post('/dashboard/changeemail', IsLoggedIn, async(req, res) => {
    const {email} = req.body
    const user = req.user
    try{
    user.email = email
    await user.save()
    req.flash('success', 'Berhasil Mengubah Email')
    res.redirect('/dashboard')
    }catch (err) {
      req.flash('success', `${err}`)
      res.redirect('/dashboard/changeemail')
    }

})

router.delete('/dashboard/user/:id',IsLoggedIn,async (req, res) => {
    const {id} = req.params
    const userDelete = await User.findByIdAndDelete(id)
    req.flash('success', 'Berhasil Menghapus User')
    res.redirect('/dashboard/user')
})

router.get('/dashboard/user/:id',IsLoggedIn,async (req,res) => {
    const {id} = req.params
    const user = await User.findById(id)
    res.render('users/edituser', {user})
})

router.put('/dashboard/user/:id',IsLoggedIn ,async (req, res) => {
    const {email, username, password} = req.body
    const user = await User.findById(req.params.id)
    try{
        user.email = email
        user.username = username
        await user.setPassword(password);
        await user.save()
        req.flash('success', 'berhasil mengedit user')
        return res.redirect('/dashboard/user')
    }
    catch (err) {
        req.flash('success', `${err}`)
        return res.redirect(`/dashboard/user/${user.id}`)
      }
})

module.exports = router