// imports
const Review = require('./review');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    location: String,
    description: String,
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) await Review.deleteMany({ id: { $in: doc.reviews } });
});

module.exports = mongoose.model('Campground', CampgroundSchema);
