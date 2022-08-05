const express = require('express')
const mongoose = require('mongoose')
const Agenda = require('../models/agendaSchema')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const router = express.Router()
const session = require('express-session')
const { IsLoggedIn } = require('../middleware')


router.get('/januari', IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'Januari' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/j', 'J')

    res.render('month', { bulan, urlPath })
})

router.get('/februari',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'Februari' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/f', 'F')

    res.render('month', { bulan,urlPath })
})

router.get('/maret',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'Maret' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/m', 'M')

    res.render('month', { bulan,urlPath })
})

router.get('/april',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'April' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/a', 'A')

    res.render('month', { bulan,urlPath })
})

router.get('/mei',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'Mei' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/m', 'M')

    res.render('month', { bulan,urlPath })
})

router.get('/juni',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'Juni' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/j', 'J')

    res.render('month', { bulan,urlPath })
})

router.get('/Juli',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'Juli' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/j', 'J')

    res.render('month', { bulan,urlPath })
})

router.get('/agustus',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'Agustus' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/a', 'A')
    res.render('month', { bulan,urlPath })
})

router.get('/september',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'September' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/s', 'S')

    res.render('month', { bulan,urlPath })
})

router.get('/oktober',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'Oktober' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/o', 'O')

    res.render('month', { bulan,urlPath })
})

router.get('/november',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'November' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/n', 'N')

    res.render('month', { bulan,urlPath })
})

router.get('/desember',IsLoggedIn, async(req, res) => {
    const bulan = await Agenda.find({ 'month': 'Desember' })
    // if(!Agustus.length){
    //     req.flash('success', 'Data tidak ada')
    //     return res.redirect('/dashboard')
    // }
    const urlPath = req.path.replace('/d', 'D')

    res.render('month', { bulan,urlPath })
})


module.exports = router