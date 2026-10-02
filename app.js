if(process.env.NODE_ENV != "production"){
  require("dotenv").config()
}

// console.log(process.env.SECRET);
console.log("MAP_TOKEN exists:", !!process.env.MAP_TOKEN);
console.log("ATLASDB_URL exists:", !!process.env.ATLASDB_URL);
console.log("SECRET exists:", !!process.env.SECRET);

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const {MongoStore} = require('connect-mongo');


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// View Engine & Middleware Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
const session = require("express-session");
// const flash = require("connect-flash");
const flash = require("express-flash");

const dburl = process.env.ATLASDB_URL

// Database Connection
async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/travel");
  await mongoose.connect(dburl);
}
main()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));


const store = MongoStore.create({
   mongoUrl: dburl,
   crypto: {
    secret: process.env.SECRET,
   },
    touchAfter: 24 * 3600,
  
})

store.on("error",()=>{
  console.log("Error is MONGO session", err);
})

//using session
const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxAge:  7*24*60*60*1000,
    httpOnly:true,
  },
}
app.use(session(sessionOption));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Home route
// app.get("/", (req, res) => {
//   res.send("I am home route");
// });

//middleware for flash popup
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curUser = req.user;
  next();
})

// Mount Routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// 404 Route Handler
app.all("/*splat", (req, res, next) => {
  next(new ExpressError(404, "page not found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(9000, () => {
  console.log(`app is listening on 9000`);
});







// const mongoose = require('mongoose');
// const express = require('express');
// const app=express();
// const Listing = require("./models/listing.js");
// const path = require("path");
// // Use EJS as the view/template engine.
// app.set("view engine","ejs");
// // Look for the view files inside this views folder.
// app.set("views",path.join(__dirname,"views"));
// //body parser
// app.use(express.urlencoded({extended:true}));
// const methodOverride = require("method-override");
// app.use(methodOverride("_method"));
// const ejsMate = require("ejs-mate");
// // When rendering an EJS file, use ejsMate to process it.
// app.engine("ejs",ejsMate);
// app.use(express.static(path.join(__dirname,"public")));
// const wrapAsync = require("./utils/wrapAsync.js");
// const ExpressError=require("./utils/ExpressError.js");
// const {listingSchema,reviewSchema} = require("./Schema.js");
// const Review = require("./models/reviews.js");
// const listings= require("./routes/listing.js");



// app.listen(9000,(req,res)=>{
//     console.log(`app is listening on 9000`);
// })

// async function main(){
// await mongoose.connect("mongodb://127.0.0.1:27017/travel");
// }
// main().then(()=>console.log("DB connected successfully"))
// .catch((err)=>console.log(err));

// // const addListing = async(req,res)=>{
// // const listing =new Listing({
// //     title:"Villa",
// //     description:"The nature around mountain",
// //     price:25000,
// //     country:"NewYork",
// //     location:"USA"
// // })
// // const ans =await listing.save();
// // console.log(ans);
// // }
// // addListing();

// // home route
// app.get("/",(req,res)=>{
//     res.send("I am home route")
// })

// const validateListing = (req,res,next)=>{
//     let {error}= listingSchema.validate(req.body);
//     if(error){
//        let errMsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }
// };


// const validateReview = (req,res,next)=>{
//     let {error}= reviewSchema.validate(req.body);
//     if(error){
//        let errMsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }
// };


// //index route
// app.get("/listings",wrapAsync(async(req,res)=>{
//     const listings = await Listing.find();
//     res.render("../views/listings/index.ejs",{listings});
// }))

// //create new
// app.get("/listings/new",(req,res)=>{
//     res.render("../views/listings/new.ejs");
// })
// app.post("/listings/new",
//     validateListing,
//     wrapAsync(async(req,res,next)=>{
//    let newListing =new Listing(req.body.listing);
//    await newListing.save();
//   console.log(newListing);
//   res.redirect("/listings")
// }))


// // update
// app.get("/listings/:id/update",wrapAsync(async(req,res)=>{
//     const {id} = req.params;
//     const listing =await Listing.findById(id);
//    res.render("../views/listings/update.ejs",{listing});
// }))

// app.put("/listings/:id/update",wrapAsync(async(req,res)=>{
//     if(!req.body.listing){
//         throw new ExpressError(400,"Send valid data for listing");
//     }
//     let {id} = req.params;
//     let listing =await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     console.log(listing);
//     res.redirect(`/listings/${id}`);
    
// }))

// app.delete("/listings/delete/:id",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     const deleteListing =await Listing.findByIdAndDelete(id);
//     res.redirect("/listings");
    
// }))

// //reviews
// //post review route
// app.post("/listings/:id/reviews",
//     validateReview,
//     wrapAsync(async(req,res)=>{
//    let listing = await Listing.findById(req.params.id);
//    let newReview = new Review(req.body.review);
//    listing.reviews.push(newReview);
//    await newReview.save();
//    await listing.save();
//    res.redirect("/listings"); 
// }))

// // delete review Router
// app.delete("/listings/:id/review/:reviewId",wrapAsync(async(req,res)=>{
//     let {id,reviewId} = req.params;
//     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
// }))

// //show route
// app.get("/listings/:id",
//     wrapAsync(async(req,res)=>{
//     const {id}=req.params;
//     let listing =await Listing.findById(id).populate("reviews");
//     res.render("../views/listings/show.ejs",{listing});
// }))

// app.all("/*splat",(req,res,next)=>{
//     next(new ExpressError(404,"page not found"));
// })

// app.use((err,req,res,next)=>{
//     let {statusCode=500,message="something went wrong"}=err;
//     res.status(statusCode).render("error.ejs",{message});
//     // res.render("error.ejs",{err});
// })
