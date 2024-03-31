const mongoose = require("mongoose");
const placeSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    address: String,
    addedphotos: [String],
    description: String,
    perks: [String],
    extraInfo: String
    ,
    checkIn: Number,
    checkOut: Number,
    max: Number,
    price:Number

    
})
const Place = mongoose.model("Place", placeSchema)

module.exports = Place;