// imports
const Campground = require('../models/campground');

// find and show all campgrounds
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
};

// render new form
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
};

// create new campground
module.exports.createCampground = async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user.id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground.id}`);
};

// find and show campground with details
module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: { path: 'author' }
        })
        .populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found!');
        res.redirect('/campgrounds');
    };
    res.render('campgrounds/show', { campground });
};

// show update form and populate it
module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Campground not found!');
        res.redirect('/campgrounds');
    };
    res.render('campgrounds/edit', { campground });
};

// update campground
module.exports.updateCampground = async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground.id}`);
};

// delete campground
module.exports.deleteCampground = async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
};