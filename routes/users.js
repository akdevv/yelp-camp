// imports
const express = require('express');
const passport = require('passport');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');

// create router instance
const router = express.Router({ mergeParams: true });

//********************** USER ROUTES ***********************//

// register route
router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register));

// login route
router.route('/login')
    .get(users.renderLoginForm)
    .post(storeReturnTo,
        passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/login'
        }), users.login);

// logout route
router.get('/logout', users.logout);

// export router
module.exports = router;