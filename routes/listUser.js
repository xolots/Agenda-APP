const express = require('express')
const mongoose = require('mongoose')
const Users = require('../models/user')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const router = express.Router()
const session = require('express-session')
const { IsLoggedIn } = require('../middleware')
const user = require('../models/user')



router.get('/',IsLoggedIn, async (req, res) => {
    const users = await Users.find({}).sort({$natural:-1});
    const IsAdmin = req.user.username
    res.render('listUser', {users, IsAdmin})
})


module.exports = router