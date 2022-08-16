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

    const findNotYet = await Agenda.find({ 'hasil': 'NOT YET' })
    const jumlahAgendaNotYet = findNotYet.length
    res.render('tanggal', { bulan, urlPath, year, month, IsAdmin,jumlahAgendaNotYet,findNotYet })
})

router.get('/:year/:month/:category', IsLoggedIn, async (req, res) => {
    const { year, month, category } = req.params
    const bulan = await Agenda.find({ year: `${year}`, month: { '$regex': `${month}`, $options: 'i' },category: `${category}` })
    const urlPath = req.path.replace('/', '')
    const IsAdmin = req.user.username

    const findNotYet = await Agenda.find({ 'hasil': 'NOT YET' })
    const jumlahAgendaNotYet = findNotYet.length
    res.render('tanggal', { bulan, urlPath, year, month, IsAdmin,jumlahAgendaNotYet,findNotYet })
})

router.get('/:year/:month/:category/:status', IsLoggedIn, async (req, res) => {
    const { year, month, category,status } = req.params
    if(status == 'NOTYET'){
        let realStatus = 'NOT YET'
        const bulan = await Agenda.find({ year: `${year}`, month: { '$regex': `${month}`, $options: 'i' },category: `${category}`, hasil: `${realStatus}` }).sort({$natural:-1});
    const urlPath = req.path.replace('/', '')
    const IsAdmin = req.user.username

    const findNotYet = await Agenda.find({ 'hasil': 'NOT YET' })
    const jumlahAgendaNotYet = findNotYet.length
    return res.render('tanggal', { bulan, urlPath, year, month, IsAdmin,jumlahAgendaNotYet,findNotYet })
    }else{
    const bulan = await Agenda.find({ year: `${year}`, month: { '$regex': `${month}`, $options: 'i' },category: `${category}`, hasil: `${status}` }).sort({$natural:-1});
    const urlPath = req.path.replace('/', '')
    const IsAdmin = req.user.username

    const findNotYet = await Agenda.find({ 'hasil': 'NOT YET' })
    const jumlahAgendaNotYet = findNotYet.length
    res.render('tanggal', { bulan, urlPath, year, month, IsAdmin,jumlahAgendaNotYet,findNotYet })}
})



router.post('/year',IsLoggedIn, (req, res) => {
    const { year, month, category, status } = req.body

    if (month === '' && year === '' && category === '' && status === ''){
        req.flash('success', 'Mohon Jangan Kosongkan Opsi')
        res.redirect('/dashboard')
    }

    if (month === '' && year === '' && category) {
        // req.flash('success', 'Harap Masukkan Opsi Tahun Dan Bulan')
        // return res.redirect('/dashboard')

        return res.redirect(`/dashboard/category/${category}`)
    }

    if (month === '' && year === '' && category === '' && status) {
        // req.flash('success', 'Harap Masukkan Opsi Tahun Dan Bulan')
        // return res.redirect('/dashboard')

        return res.redirect(`/dashboard/status/${status}`)
    }
    if (month === '') {
        return res.redirect(`/dashboard/year/${year}`)
    } else if (year === '') {
        return res.redirect(`/dashboard/month/${month}`)
    } else if (category === '') {
        return res.redirect(`/dashboard/tanggal/${year}/${month}`)
    }




     res.redirect(`/dashboard/tanggal/${year}/${month}/${category}/${status}`)

})

module.exports = router