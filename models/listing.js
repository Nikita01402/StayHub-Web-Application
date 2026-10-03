//create model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const { required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },

  description: {
    type: String,
    // required: true,
  },

  image: {
    // type: String,
    // default:
    //   "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    // set: (v) =>
    //   v === ""
    //     ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    //     : v,
    url:{
      type:String,
      required: true,
    },
    filename:{
      type:String,
      required: true,
    }
  },

  price: {
    type: Number,
    min: 0,
  },

  location: {
    type: String,
    // required: true,
  },

  country: {
    type: String,
    // required: true,
  },
  reviews:[
  {
    type:Schema.Types.ObjectId,
    ref:"Review"
  }
],
owner:{
     type: Schema.Types.ObjectId,
     ref:"User"
},
geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
},
category: {
  type: String,
  enum: ["trending", "rooms", "iconic", "castles", "pools", "farms", "camping", "arctic", "domes", "boats", "beach"],
},
});


listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany({_id:{$in:listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;