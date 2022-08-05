const express = require('express')
const mongoose = require('mongoose')
const Agenda = require('../models/agendaSchema')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const router = express.Router()
const session = require('express-session')
const { IsLoggedIn } = require('../middleware')

router.get('/done',IsLoggedIn, async(req, res) => {
    const urlPath = req.path.replace('/', '')
    const bulan = await Agenda.find({'hasil': 'DONE'})
    res.render('status/done', {urlPath, bulan})
})

router.get('/ongoing',IsLoggedIn, async(req, res) => {
    const urlPath = req.path.replace('/', '')
    const bulan = await Agenda.find({'hasil': 'ON-GOING'})
    res.render('status/done', {urlPath, bulan})
})

router.get('/notyet',IsLoggedIn, async(req, res) => {
    const urlPath = req.path.replace('/', '')
    const bulan = await Agenda.find({'hasil': 'NOT YET'})
    res.render('status/done', {urlPath, bulan})
})

router.get('/delay',IsLoggedIn, async(req, res) => {
    const urlPath = req.path.replace('/', '')
    const bulan = await Agenda.find({'hasil': 'DELAY'})
    res.render('status/done', {urlPath, bulan})
})

router.get('/cancel',IsLoggedIn, async(req, res) => {
    const urlPath = req.path.replace('/', '')
    const bulan = await Agenda.find({'hasil': 'CANCEL'})
    res.render('status/done', {urlPath, bulan})
})

module.exports = router