const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

main().then(() => console.log('koneksi db berhasil')).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://dakochan:dakochan@cluster0.vdugc.mongodb.net/?retryWrites=true&w=majority');
}


const AgendaSchema = new mongoose.Schema({
    date: String,
    time: String,
    year: String,
    month: String,
    dailyAgenda: String,
    category: String,
    hasil: String,
})


AgendaSchema.plugin(mongoosePaginate);


const Agenda = mongoose.model('Agenda', AgendaSchema)

// const seed = new Agenda({
//     date:'26-07-2022',
//     time: '11:35',
//     dailyAgenda: 'Mengawal Anak Magang Pembuatan Web Development',
//     hasil: 'DONE',
//     kateranganHasil: 'Lanjut pembelajaran bootstrap'
// })


module.exports = Agenda