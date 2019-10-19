const mongoose = require('mongoose');
const {Schema} = mongoose;

const cardSchema = new Schema({
    name: String,
    cardNumber: Number,
    balance: {type: Number, default: 0},
    limit: Number
});

const Card = mongoose.model('cards', cardSchema);
module.exports = Card;