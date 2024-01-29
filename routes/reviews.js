// imports
const express = require('express');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');

// create router instance
const router = express.Router({ mergeParams: true });

//******************** REVIEWS ROUTES *********************//

// create route
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// delete route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

// export router
module.exports = router;