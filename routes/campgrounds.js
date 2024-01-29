// imports
const express = require('express');
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds');
const { isAuthor, isLoggedIn, validateCampground } = require('../middleware');

// create router instance
const router = express.Router();

//******************** CAMPGROUND ROUTES *********************//

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// export router
module.exports = router;
