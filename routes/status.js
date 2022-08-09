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
    const IsAdmin = req.user.username
    res.render('status/done', {urlPath, bulan, IsAdmin})
})

router.get('/ongoing',IsLoggedIn, async(req, res) => {
    const urlPath = req.path.replace('/', '')
    const bulan = await Agenda.find({'hasil': 'ON-GOING'})
    const IsAdmin = req.user.username

    res.render('status/done', {urlPath, bulan,IsAdmin})
})

router.get('/notyet',IsLoggedIn, async(req, res) => {
    const urlPath = req.path.replace('/', '')
    const bulan = await Agenda.find({'hasil': 'NOT YET'})
    const IsAdmin = req.user.username
    res.render('status/done', {urlPath, bulan, IsAdmin})
})

router.get('/delay',IsLoggedIn, async(req, res) => {
    const urlPath = req.path.replace('/', '')
    const bulan = await Agenda.find({'hasil': 'DELAY'})
    const IsAdmin = req.user.username

    res.render('status/done', {urlPath, bulan, IsAdmin})
})

router.get('/cancel',IsLoggedIn, async(req, res) => {
    const urlPath = req.path.replace('/', '')
    const bulan = await Agenda.find({'hasil': 'CANCEL'})
    const IsAdmin = req.user.username

    res.render('status/done', {urlPath, bulan, IsAdmin})
})

module.exports = router