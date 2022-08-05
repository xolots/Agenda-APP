const express = require('express')
const mongoose = require('mongoose')
const Agenda = require('../models/agendaSchema')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const router = express.Router()
const session = require('express-session')
const { IsLoggedIn } = require('../middleware')

router.get('/', async (req, res) => {
    const dataAgenda = await Agenda.find({})

    //Mengambil Tanggal
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    //Mengambil Waktu
    var date = new Date();
    var options = { hour: '2-digit', minute: '2-digit', hour12: false };
    const time = date.toLocaleTimeString(['en-US'], options)

    //Finf by month
    // const Januari = await Agenda.find({ 'month': 'Januari' })
    // const Februari = await Agenda.find({ 'month': 'Februari' })
    // const Maret = await Agenda.find({ 'month': 'Maret' })
    // const April = await Agenda.find({ 'month': 'April' })
    // const Mei = await Agenda.find({ 'month': 'Mei' })
    // const Juni = await Agenda.find({ 'month': 'Juni' })
    // const Juli = await Agenda.find({ 'month': 'Juli' })
    // const Agustus = await Agenda.find({ 'month': 'Agustus' })
    // const September = await Agenda.find({ 'month': 'September' })
    // const Oktober = await Agenda.find({ 'month': 'Oktober' })
    // const November = await Agenda.find({ 'month': 'November' })
    // const Desember = await Agenda.find({ 'month': 'Desember' })


    //Ambil Semua Tahun Di Database
    // const tahun = await Agenda.find({}).select('date -_id')
    // const tahunLength = tahun.length
    // console.log(tahun)
    // console.log(yyyy)

    const tahun = await Agenda.find({'date': {$regex:'2022'}})


    res.render('index', { dataAgenda, today, time, mm, tahun })
})




router.get('/edit/:id', IsLoggedIn, async (req, res) => {
    const { id } = req.params
    const agenda = await Agenda.findById(id)

    //Mengambil Waktu
    var date = new Date();
    var options = { hour: '2-digit', minute: '2-digit', hour12: false };
    const time = date.toLocaleTimeString(['en-US'], options)

    res.render('edit', { agenda, time })
})

router.post('/', IsLoggedIn, async (req, res) => {
    const body = req.body
    const createNew = new Agenda(body)
    await createNew.save()
    req.flash('success', 'Berhasil Menambah Agenda Baru')
    res.redirect('/dashboard')
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    const hacaripus = await Agenda.findByIdAndDelete(id)
    req.flash('success', 'Agenda Berhasil Dihapus')
    res.redirect('/dashboard')
})

router.put('/edit/:id', IsLoggedIn, async (req, res) => {
    const { id } = req.params
    const editData = await Agenda.findByIdAndUpdate(id, req.body)
    req.flash('success', 'Berhasil Mengedit Agenda')
    res.redirect('/dashboard')
})

router.get('/new', IsLoggedIn, async (req, res) => {
    const dataAgenda = await Agenda.find({})

    //Mengambil Tanggal
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    //Mengambil Waktu
    var date = new Date();
    var options = { hour: '2-digit', minute: '2-digit', hour12: false };
    const time = date.toLocaleTimeString(['en-US'], options)

    //Mengambil bulan
    const month = date.toLocaleString('id-ID', { month: 'long' });
    // console.log(month);


    res.render('add', { dataAgenda, today, time, mm, month, yyyy })
})

module.exports = router