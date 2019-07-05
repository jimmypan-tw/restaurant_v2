const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// routes settings
router.get('/', (req, res) => {
    Restaurant.find((err, restaurants) => {
        // 把Restaurant model所有的資料都抓回來
        if (err) return console.error(err)
        return res.render('index', { restaurants: restaurants })
    })
})

router.get('/search', (req, res) => {
    const keyword = req.query.keyword
    Restaurant.find((err, all_restaurants) => {
        // 把Restaurant model所有的資料都抓回來
        if (err) return console.error(err)
        const restaurants = all_restaurants.filter(restaurant => {
            return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        })
        return res.render('index', { restaurants: restaurants, keyword: keyword })
    })
})


module.exports = router