// imports
const express = require('express');
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds');
const { isAuthor, isLoggedIn, validateCampground } = require('../middleware');

// create router instance
const router = express.Router();

//******************** CAMPGROUND ROUTES *********************//

// index route
router.get('/', catchAsync(campgrounds.index));

// new route
router.get('/new', isLoggedIn, campgrounds.renderNewForm);
router.post('/', validateCampground, isLoggedIn, catchAsync(campgrounds.createCampground));

// show route
router.get('/:id', catchAsync(campgrounds.showCampground));

// update route
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

// delete route
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// export router
module.exports = router;