// use dotenv in dev mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

// imports
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const localStratergy = require('passport-local');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const mongoSanitize = require('express-mongo-sanitize');

// import routes
const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/reviews');
const campgroundRoutes = require('./routes/campgrounds');

// import models
const User = require('./models/user');

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

// app setup
const app = express();
app.use(mongoSanitize());
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

// create new MongoStore
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 60 * 60 // time in seconds
});

store.on('error', (err) => {
    console.log('session store error', err);
});

// session configuration
const sessionConfig = {
    store,
    name: 'session.id',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true, (un-comment in production site)
        httpOnly: true,
        // (1000 * 60 * 60 * 24 * 7) = one week
        maxAge: 1000 * 60 * 60 * 24 * 7,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    }
};
app.use(session(sessionConfig));

// helmet configuration
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/da4hupi8g/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


// passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash configuration
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// use routes
app.use('/', userRoutes);
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