const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const {IsLoggedIn} = require('../middleware')
const Agenda = require('../models/agendaSchema')



router.get('/:year/:month',async (req, res) => {
    const {year, month} = req.params
    const bulan = await Agenda.find({year: `${year}`, month: {'$regex': `${month}`,$options:'i'}})
    const urlPath = req.path.replace('/', '')
    res.render('tanggal', {bulan, urlPath, year, month})
})

router.post('/year', (req, res) => {
    const {year, month} = req.body

    if(month === '' && year === ''){
        req.flash('success', 'Harap Masukkan Opsi Tahun Dan Bulan')
        return res.redirect('/dashboard')
    }
    if(month === ''){
        return res.redirect(`/dashboard/year/${year}`)
    }else if(year === ''){
        return res.redirect(`/dashboard/month/${month}`)
    }





    res.redirect(`/dashboard/tanggal/${year}/${month}`)
})

module.exports = router