// config/passport.js
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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

    passport.use(
        new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK,
            profileFields: ['email', 'displayName']
        }, (accessToken, refreshToen, profile, done) => {
            // find and create user
            console.log("profile._json: ", profile._json)
            User.findOne({
                email: profile._json.email
            }).then(user => {
                if (!user) {
                    // 因為密碼是必填欄位，所以我們可以幫使用者隨機產生一組密碼，然後用 bcrypt 處理，再儲存起來
                    let randomPassword = Math.random().toString(36).slice(-8)
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(randomPassword, salt, (err, hash) => {
                            let newUser = User({
                                name: profile._json.name,
                                email: profile._json.email,
                                password: hash
                            })
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })
                    )
                } else {
                    return done(null, user)
                }
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