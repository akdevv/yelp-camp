// imports
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');

// connect mongoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log('connection open!');
    })
    .catch((err) => {
        console.log('opps! an error occured');
        console.log(err);
    });

// app setup
const app = express();
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));


// home route
app.get('/', (req, res) => {
    res.render('home');
});


// index route
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});


// new route
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground.id}`);
});


// show route
app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
});


// update route
app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground.id}`);
});


// delete route
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
});

// start the server
app.listen(3000, () => {
    console.log('Listening on Port: 3000!');
});