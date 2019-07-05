const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
// 引用 method-override
const methodOverride = require('method-override')
// 設定 method-override
router.use(methodOverride('_method'))

// 新增一筆 restaurant 的資料頁面
router.get('/new', (req, res) => {
    return res.render('new')
})

// sort
router.get('/sort', (req, res) => {
    console.log(req._parsedOriginalUrl.query)
    switch (req._parsedOriginalUrl.query) {
        case 'atoz':
            Restaurant.find((err, restaurants) => {
                if (err) return console.error(err)
                return res.render('index', { restaurants })
            }).sort({ name_en: 1 })
            break
        case 'ztoa':
            Restaurant.find((err, restaurants) => {
                if (err) return console.error(err)
                return res.render('index', { restaurants })
            }).sort({ name_en: -1 })
            break
        case 'category':
            Restaurant.find((err, restaurants) => {
                if (err) return console.error(err)
                return res.render('index', { restaurants })
            }).sort({ category: 1 })
            break
        case 'rating':
            Restaurant.find((err, restaurants) => {
                if (err) return console.error(err)
                return res.render('index', { restaurants })
            }).sort({ rating: -1 })
    }
})

// 新增一筆 restaurant
router.post('/', (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        name_en: req.body.name_en,
        category: req.body.category,
        phone: req.body.phone,
        location: req.body.location,
        google_map: req.body.google_map,
        rating: req.body.rating,
        image: req.body.image,
        description: req.body.description
    })

    restaurant.save(err => {
        if (err) return console.error(err)
        return res.redirect('/')
    })
})


// 檢視一筆 restaurant 詳細資料
router.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) return console.error(err)
        return res.render('show', { restaurant: restaurant })
    })
})

// 修改一筆 restaurant 的頁面
router.get('/:id/edit', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) return console.error(err)
        return res.render('edit', { restaurant: restaurant })
    })
})

// 修改一筆 restaurant
router.put('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) return console.error(err)
        console.log("req.params: ", req.params)
        console.log("req.body: ", req.body)
        // restaurant.id = req.params.id
        restaurant.name = req.body.name
        restaurant.name_en = req.body.name_en
        restaurant.category = req.body.category
        restaurant.phone = req.body.phone
        restaurant.location = req.body.location
        restaurant.google_map = req.body.google_map
        restaurant.rating = req.body.rating
        restaurant.image = req.body.image
        restaurant.description = req.body.description
        restaurant.save(err => {
            if (err) return console.error(err);
            return res.redirect(`/restaurants/${req.params.id}`)
        })
    })
})

// 刪除一筆 restaurant
router.delete('/:id/delete', (req, res) => {
    Restaurant.findById(req.params.id, (err, restaurant) => {
        if (err) return console.error(err)
        restaurant.remove(err => {
            if (err) return console.error(err)
            return res.redirect('/')
        })
    })
})


module.exports = router