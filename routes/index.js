const express = require('express')
const mongoose = require('mongoose')
const Agenda = require('../models/agendaSchema')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const router = express.Router()
const session = require('express-session')
const { IsLoggedIn } = require('../middleware')
const AppError = require('../AppError')
const catchAsync = require('../catchAsync')


router.get('/', IsLoggedIn,catchAsync(async (req, res) => {
    // const dataAgenda = await Agenda.find({}).sort({$natural:-1}).limit(30);

    const page = parseInt(req.query.page || 1)
    // const limit = req.query.limit || 10

    const options = {
        page: page,
        limit: 10,
        sort: { $natural: -1 }
    };


    // console.log(page)      
    const dataAgendaa = await Agenda.paginate({}, options)
    const stickyAgenda = await Agenda.find({ sticky: true })
    // const dataAgendaa3 = await Agenda.paginate({}, options2)

    const dataAgenda = dataAgendaa.docs
    // console.log(req.query)
    // console.log(stickyAgenda)
    // console.log(dataAgendaPaginate)

    //Mengambil Tanggal
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    //Mengambil Waktu
    var date = new Date();
    var optionsDate = { hour: '2-digit', minute: '2-digit', hour12: false };
    const time = date.toLocaleTimeString(['en-US'], optionsDate)

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
    const tahun1 = await Agenda.find({}).select('date -_id')
    const tahunLength = tahun1.length
    // console.log(tahun1)
    // console.log(yyyy)

    const tahun = await Agenda.find({ 'date': { $regex: '2022' } })
    const IsAdmin = req.user.username


    //Mencari Semua Agenda Dengan Status Not-Yet
    const findNotYet = await Agenda.find({ 'hasil': 'NOT YET' })
    const jumlahAgendaNotYet = findNotYet.length


    res.render('index', { dataAgenda, today, time, mm, tahun, IsAdmin, jumlahAgendaNotYet, findNotYet, page, stickyAgenda })
}))

router.get('/navbar', (req, res) => {
    res.render('partials/navbar')
})




router.get('/edit/:id', IsLoggedIn,catchAsync(async (req, res, next) => {
        const { id } = req.params
        const agenda = await Agenda.findById(id)
        // if(!agenda){
        //     return next(new ExpressError('Agenda Tidak Ditemukan'))
        // }


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


        const IsAdmin = req.user.username

        return res.render('edit', { agenda, time, IsAdmin, today })

}))

router.post('/', IsLoggedIn, catchAsync( async (req, res) => {
    const body = req.body
    const createNew = new Agenda(body)
    await createNew.save()
    req.flash('success', 'Berhasil Menambah Agenda Baru')
    res.redirect('/dashboard')
}))

router.delete('/:id', IsLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params
    const hacaripus = await Agenda.findByIdAndDelete(id)
    req.flash('success', 'Agenda Berhasil Dihapus')
    res.redirect('/dashboard')
}))

router.put('/edit/:id', IsLoggedIn,catchAsync( async (req, res) => {
    const { id } = req.params
    const editData = await Agenda.findByIdAndUpdate(id, req.body)
    req.flash('success', 'Berhasil Mengedit Agenda')
    res.redirect('/dashboard')
}))

router.get('/new', IsLoggedIn, async (req, res) => {
    // const dataAgenda = await Agenda.find({})

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

    const IsAdmin = req.user.username



    res.render('add', { dataAgenda, today, time, mm, month, yyyy, IsAdmin })
})






module.exports = router