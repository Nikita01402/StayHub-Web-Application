const Listing = require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.map_Token;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index = async (req, res) => {
  let { category, search } = req.query;
  let filter = {};
  if (category) {
    filter.category = category;
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
    ];
  }
  const listings = await Listing.find(filter);
  res.render("listings/index.ejs", { listings, category, search });
}


module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing = (async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",       // populate all reviews on this listing
      populate: {
        path: "author",      // for each review, also populate its author (user who wrote it)
      },
    })
    .populate("owner");      // populate the listing's owner (user who created it)

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings"); // return added to stop execution here
  }
  res.render("listings/show.ejs", { listing });
})


module.exports.createListing = async (req, res, next) => {
  //geocoding
  let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 2,
})
  .send()

  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; // assign logged-in user as the listing's owner
  newListing.image = {url, filename};

  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();
  console.log(savedListing);
  
  // await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/update.ejs", { listing });
}


module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 2,
  })
    .send()

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  listing.geometry = response.body.features[0].geometry;

  if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image= {url,filename};
  }
  await listing.save();
  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
}


module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
}