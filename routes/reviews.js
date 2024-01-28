// imports
const express = require('express');
const Review = require('../models/review');
const { reviewSchema } = require('../schemas');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError');

// create router instance
const router = express.Router({ mergeParams: true });

// reviews validation middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(ele => ele.message).join(',');
        throw new ExpressError(msg, 400);
    } else next();
};

//******************** REVIEWS ROUTES *********************//

// new review route
router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully created a new review!');
    res.redirect(`/campgrounds/${campground.id}`);
}));

// delete review route
router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}));

// export router
module.exports = router;