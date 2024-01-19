// imports
const cities = require('./cities');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelper');

// connect mongoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log('connection open!');
    })
    .catch((err) => {
        console.log('opps! an error occured');
        console.log(err);
    });

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    // empty the database
    await Campground.deleteMany({});

    // create new campgrounds
    for (let i = 0; i < 50; i++) {
        const randNum = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[randNum].city}, ${cities[randNum].state}`,
        });
        await camp.save();
    }
}

seedDB()
    .then(() => {
        console.log('database seeded succesfully!');
        console.log('closing connection!');
        mongoose.connection.close();
    });

