module.exports.IsLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        // console.log(req.session.returnTo)
        req.flash('success', 'Kamu harus login terlebih dahulu untuk mengakses halaman ini')
        return res.redirect('/')
    }
    next()
}