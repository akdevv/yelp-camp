// imports
const Review = require('./models/review');
const Campground = require('./models/campground');
const ExpressError = require('./utils/ExpressError');
const { reviewSchema, campgroundSchema } = require('./schemas');

// check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be Logged In!');
        return res.redirect('/login');
    } else next();
};

// store redirect url
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    } else next();
};

// campground validation using Joi
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(ele => ele.message).join(',');
        throw new ExpressError(msg, 400);
    } else next();
};

// validate reviews using Joi
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((ele) => ele.message).join(',');
        throw new ExpressError(msg, 400);
    } else next();
};

// check if current user is the author
module.exports.isAuthor = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground.author.equals(req.user.id)) {
        req.flash('error', `You don't have permission to that!`);
        return res.redirect(`/campgrounds/${req.params.id}`);
    } else next();
};

// check if current user is the review author
module.exports.isReviewAuthor = async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review.author.equals(req.user.id)) {
        req.flash('error', `You don't have permission to that!`);
        return res.redirect(`/campgrounds/${req.params.id}`);
    } else next();
};
