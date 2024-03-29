// use dotenv in dev mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

// imports
const cities = require('./cities');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelper');

// connect mongoose
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl)
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
    for (let i = 0; i < 500; i++) {
        const randNum = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            price,
            author: '65b92a11a3dc9316802b779b',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[randNum].city}, ${cities[randNum].state}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum quisquam architecto tenetur saepe mollitia soluta itaque, quam quod adipisci magnam iusto, quasi illo et doloremque nostrum eos perspiciatis totam ab.',
            images: [
                {
                    url: 'https://res.cloudinary.com/da4hupi8g/image/upload/v1706594799/yelp-camp/default/e3mhbuqm5xii2kq4fzjg.jpg',
                    filename: 'yelp-camp/default/e3mhbuqm5xii2kq4fzjg'
                },
                {
                    url: 'https://res.cloudinary.com/da4hupi8g/image/upload/v1706594799/yelp-camp/default/fwgmga05uiqfft6xzn5b.jpg',
                    filename: 'yelp-camp/default/fwgmga05uiqfft6xzn5b'
                }
            ],
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[randNum].longitude,
                    cities[randNum].latitude
                ]
            }
        });
        await camp.save();
    };
};

seedDB()
    .then(() => {
        console.log('database seeded succesfully!');
        console.log('closing connection!');
        mongoose.connection.close();
    });
