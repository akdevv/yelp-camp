// imports
const express = require('express');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

// create router instance
const router = express.Router({ mergeParams: true });

//********************** USER ROUTES ***********************//

// register routes
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
}));

// export router
module.exports = router;