const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')

// include json file
const restaurant_list = require('./restaurant.json')
const restaurants = restaurant_list.results
const users = restaurant_list.users

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('db error')
})

db.once('open', () => {
    console.log('db connected.')
    for (let j = 0; j < 2; j++){
        user = users[j]
        User.create({
            name: "user"+j.toString(),
            email: user.email.toString(),
            password: user.password.toString()
        })
    }
    for (let i = 0; i < 8; i++) {
        restaurant = restaurants[i]
        Restaurant.create({
            name: restaurant.name.toString(),
            name_en: restaurant.name_en.toString(),
            category: restaurant.category.toString(),
            image: restaurant.image.toString(),
            location: restaurant.location.toString(),
            phone: restaurant.phone.toString(),
            google_map: restaurant.google_map.toString(),
            rating: restaurant.rating,
            description: restaurant.description.toString()
        })
    }
    console.log('done')
})