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
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            price,
            author: '65b7ab41c7de673e96527639',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[randNum].city}, ${cities[randNum].state}`,
            geometry: { type: 'Point', coordinates: [-113.1331, 47.0202] },
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
            ]
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
