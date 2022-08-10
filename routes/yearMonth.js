const express = require('express')
const mongoose = require('mongoose')
const Agenda = require('../models/agendaSchema')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const router = express.Router()
const session = require('express-session')
const { IsLoggedIn } = require('../middleware')



router.get('/:year/:month', IsLoggedIn, async (req, res) => {
    const { year, month } = req.params
    const bulan = await Agenda.find({ year: `${year}`, month: { '$regex': `${month}`, $options: 'i' } })
    const urlPath = req.path.replace('/', '')
    const IsAdmin = req.user.username
    console.log(IsAdmin)
    res.render('tanggal', { bulan, urlPath, year, month, IsAdmin })
})

router.get('/:year/:month/:category', IsLoggedIn, async (req, res) => {
    const { year, month, category } = req.params
    const bulan = await Agenda.find({ year: `${year}`, month: { '$regex': `${month}`, $options: 'i' },category: `${category}` })
    const urlPath = req.path.replace('/', '')
    const IsAdmin = req.user.username
    console.log(IsAdmin)
    res.render('tanggal', { bulan, urlPath, year, month, IsAdmin })
})



router.post('/year', (req, res) => {
    const { year, month, category } = req.body

    if (month === '' && year === '' && category === ''){
        req.flash('success', 'Harap Masukkan Opsi Bulan,Tahun,Category')
        res.redirect('/dashboard')
    }

    if (month === '' && year === '' && category) {
        // req.flash('success', 'Harap Masukkan Opsi Tahun Dan Bulan')
        // return res.redirect('/dashboard')

        return res.redirect(`/dashboard/category/${category}`)
    }
    if (month === '') {
        return res.redirect(`/dashboard/year/${year}`)
    } else if (year === '') {
        return res.redirect(`/dashboard/month/${month}`)
    } else if (category === '') {
        return res.redirect(`/dashboard/tanggal/${year}/${month}`)
    }




     res.redirect(`/dashboard/tanggal/${year}/${month}/${category}`)

})

module.exports = router