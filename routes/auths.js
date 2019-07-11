// routes/auths.js
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get(
    '/facebook',   // 使用者要透過 Facebook 登入時的網址
    passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
)

router.get(
    '/facebook/callback',  // 當我們取得「授權許可」後 redirect 的網址 
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/users/login',
    })
)

module.exports = router