const express = require('express')
const mongoose = require('mongoose')
const Agenda = require('../models/agendaSchema')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const router = express.Router()
const session = require('express-session')
const { IsLoggedIn } = require('../middleware')

router.get('/:year',IsLoggedIn, async(req, res) => {
    const {year} = req.params
    const tahun = await Agenda.find({'date': {$regex:`${year}`}})
    const urlPath = req.path.replace('/', '')
    const IsAdmin = req.user.username
    const findNotYet = await Agenda.find({ 'hasil': 'NOT YET' })
    const jumlahAgendaNotYet = findNotYet.length
    res.render('year', {urlPath, tahun,findNotYet, jumlahAgendaNotYet, IsAdmin})
})

module.exports = router