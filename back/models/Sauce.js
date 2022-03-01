const mongoose = require('mongoose');


const sauceSchema = mongoose.Schema({
    userId : { type: String, required: true},
    name : { type: String, required: true},
    manufacturer : { type: String, required: true},
    mainPepper : { type: String, required: true},
    imageUrl : { type: Number, required: true},
    heat : { type: Number, required: true},
    likes : { type: Number, default: 0},
    dislikes : { type: Number,  default: 0},
    usersLiked : { type: [Number]},
    usersDisliked : { type: [Number]}
});


module.exports = mongoose.model('Sauce', sauceSchema);