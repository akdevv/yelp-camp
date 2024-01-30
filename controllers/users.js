// imports
const User = require('../models/user');

// render register form
module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
};

// register user
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    };
};

// render login form
module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

// login user
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete res.locals.returnTo;
    res.redirect(redirectUrl);
};

// logout user
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Successfully Logged Out!');
        res.redirect('/campgrounds');
    });
};
