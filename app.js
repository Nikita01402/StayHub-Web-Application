const mongoose = require('mongoose');
const express = require('express');
const app=express();
const Listing = require("./models/listing.js");
const path = require("path");
// Use EJS as the view/template engine.
app.set("view engine","ejs");
// Look for the view files inside this views folder.
app.set("views",path.join(__dirname,"views"));
//body parser
app.use(express.urlencoded({extended:true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
// When rendering an EJS file, use ejsMate to process it.
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
// const {listingSchema} = require("/.schema/js")


app.listen(9000,(req,res)=>{
    console.log(`app is listening on 9000`);
})

async function main(){
await mongoose.connect("mongodb://127.0.0.1:27017/travel");
}
main().then(()=>console.log("DB connected successfully"))
.catch((err)=>console.log(err));

// const addListing = async(req,res)=>{
// const listing =new Listing({
//     title:"Villa",
//     description:"The nature around mountain",
//     price:25000,
//     country:"NewYork",
//     location:"USA"
// })
// const ans =await listing.save();
// console.log(ans);
// }
// addListing();

// home route
app.get("/",(req,res)=>{
    res.send("I am home route")
})

//index route
app.get("/listings",wrapAsync(async(req,res)=>{
    const listings = await Listing.find();
    res.render("../views/listings/index.ejs",{listings});
}))

//create new
app.get("/listings/new",(req,res)=>{
    res.render("../views/listings/new.ejs");
})
app.post("/listings/new",wrapAsync(async(req,res,next)=>{
     if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
   let newListing =new Listing(req.body.listing);
   await newListing.save();
  console.log(newListing);
  res.redirect("/listings")
}))


// update
app.get("/listings/:id/update",wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const listing =await Listing.findById(id);
   res.render("../views/listings/update.ejs",{listing});
}))

app.put("/listings/:id/update",wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing");
    }
    let {id} = req.params;
    let listing =await Listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log(listing);
    res.redirect(`/listings/${id}`);
    
}))

app.delete("/listings/delete/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const deleteListing =await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    
}))

//show route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    const {id}=req.params;
    let listing =await Listing.findById(id);
    res.render("../views/listings/show.ejs",{listing});
}))

app.all("/*splat",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
    // res.render("error.ejs",{err});
})