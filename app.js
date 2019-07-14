// Include express from node_modules
const express = require('express')
const app = express()

// 判別開發環境
// 如果不是 production 模式, 使用 dotenv 讀取 .env 檔案
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Define server related variables
const port = 3001

// require express-handlebars here
const exphbs = require('express-handlebars')

// 載入 express-session 與 passport
const session = require('express-session')
const passport = require('passport')

// 載入 connect-flash   
const flash = require('connect-flash')
app.use(flash())

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('static'))

// 引用body-parser
const bodyParser = require('body-parser')

// 設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 使用 express session 
app.use(session({
    secret: 'abcde',                // secret: 定義一組自己的私鑰（字串)
    resave: 'false',
    saveUninitialized: 'false'
}))
// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport) // 是一個 Passport 套件的 instance

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
// 建立 local variables
app.use((req, res, next) => {
    res.locals.user = req.user

    // 辨識使用者是否已經登入的變數，讓 view 可以使用
    res.locals.isAuthenticated = req.isAuthenticated()

    // 新增兩個 flash message 變數 
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')

    next()
})

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected.')
})

const Restaurant = require('./models/restaurant.js')


// 載入router
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})