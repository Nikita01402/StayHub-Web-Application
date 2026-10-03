// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }

// const mongoose = require('mongoose');
// const Listing = require("../models/listing.js");
// const initData = require("./data.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/travel";

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }
// main().then((res)=>console.log("Connected successfully"))
// .catch((err)=>console.log(err));

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj)=>({...obj, owner:"6ab244d62e82edd51d0d5c98"}));
//       await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
    
// }

// initDB();


if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
}

const mongoose = require('mongoose');
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// const MONGO_URL="mongodb://127.0.0.1:27017/travel";
const DB_URL= process.env.ATLASDB_URL;

async function main() {
  // await mongoose.connect(MONGO_URL);
  await mongoose.connect(DB_URL);
}
main().then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});

  const listingsWithGeometry = [];

  for (let obj of initData.data) {
    let response = await geocodingClient
      .forwardGeocode({
        query: `${obj.location}, ${obj.country}`,
        limit: 1,
      })
      .send();

    let geometry =
      response.body.features[0] && response.body.features[0].geometry
        ? response.body.features[0].geometry
        : { type: "Point", coordinates: [0, 0] };

    listingsWithGeometry.push({
      ...obj,
      owner: "6ab244d62e82edd51d0d5c98",
      geometry,
    });
  }

  await Listing.insertMany(listingsWithGeometry);
  console.log("Data was initialized");
};

initDB();