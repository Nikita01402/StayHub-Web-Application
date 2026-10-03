const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("./middleware.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })



const ListingController = require("../controllers/listings");
const { route } = require("./user.js");

// Index route - Show all listings (public, no login required)
router.get("/",
     wrapAsync(ListingController.index));


// New Route - Render form to create a new listing (must be logged in)
router.get("/new", 
    isLoggedIn, 
    ListingController.renderNewForm);


// Create post route - Save new listing to DB, attach current user as owner
router.post("/new", 
    isLoggedIn,
     upload.single("listing[image]"),
    validateListing, 
     wrapAsync(ListingController.createListing));


// Update form route - Render edit form (must be logged in AND be the owner)
router.get("/:id/update", 
    isLoggedIn, 
    isOwner,
    wrapAsync(ListingController.renderEditForm));



// Update put route - Apply edits to listing (must be logged in AND be the owner)
router.put("/:id/update", 
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing, wrapAsync(ListingController.updateListing));


// Delete route - Remove listing from DB (must be logged in AND be the owner)
router.delete("/delete/:id",
     isLoggedIn,
      isOwner, 
      wrapAsync(ListingController.destroyListing));

// Show route - Display single listing with populated owner and review authors
router.get("/:id", 
    wrapAsync(ListingController.showListing));

module.exports = router;