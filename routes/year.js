const express = require('express')
const mongoose = require('mongoose')
const Agenda = require('../models/agendaSchema')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const router = express.Router()
const session = require('express-session')
const { IsLoggedIn } = require('../middleware')

router.get('/2022',IsLoggedIn, async(req, res) => {
    const tahun = await Agenda.find({'date': {$regex:'2022'}})
    const urlPath = req.path.replace('/', '')
    res.render('year', {urlPath, tahun})
})

module.exports = router