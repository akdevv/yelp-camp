// imports
const Review = require('./review');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    images: [{
        url: String,
        filename: String
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) await Review.deleteMany({ id: { $in: doc.reviews } });
});

module.exports = mongoose.model('Campground', CampgroundSchema);
