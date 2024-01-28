// imports
const path = require('path');
const express = require('express');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');

// import routes
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

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
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

// session configuration
const sessionConfig = {
    secret: 'yelp-camp',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // (1000 * 60 * 60 * 24 * 7) = one week
        maxAge: 1000 * 60 * 60 * 24 * 7,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    }
};
app.use(session(sessionConfig));

// flash configuration
app.use(flash());
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// use routes
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

// home route
app.get('/', (req, res) => {
    res.render('home');
});

// 404 error
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found!', 404));
});

// err middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'something went wrong';
    res.status(statusCode).render('errors', { err });
});

// start the server
app.listen(3000, () => {
    console.log('Listening on Port: 3000!');
});