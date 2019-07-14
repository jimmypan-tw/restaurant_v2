// config/auth.js
module.exports = {
    authenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('warning_msg', 'Please login first') // 加上warning_msg
        res.redirect('/users/login')
    }
}
