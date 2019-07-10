// Include express from node_modules
const express = require('express')
const app = express()
// Define server related variables
const port = 3001

// require express-handlebars here
const exphbs = require('express-handlebars')

// 載入 express-session 與 passport
const session = require('express-session')
const passport = require('passport')

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
app.use((req, res, next) => {
    res.locals.user = req.user
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

app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})