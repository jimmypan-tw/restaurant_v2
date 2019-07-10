// config/passport.js
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// 載入 User model
const User = require('../models/user')

module.exports = passport => {
    // 使用 Passport 的官方文件上的語法
    // 定義 usernameField 為 email 
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' })
                }
                //用 bcrypt 來比較「使用者輸入的密碼」跟在使用者資料庫的密碼是否是同一組字串
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Email or Password Incorrect' })
                    }
                })
            })
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}