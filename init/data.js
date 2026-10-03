const sampleListings = [
  {
    title: "Tropical Beach Villa",
    description: "Relax in a beautiful beachfront villa surrounded by palm trees, crystal-clear water, and peaceful tropical views.",
    image: {
      filename: "listingimage",
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d2bde6162917469.63dd22c992a49.jpg"
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
      category: "trending"
  },

  {
    title: "Parisian Eiffel View Apartment",
    description: "Stay in a stylish Paris apartment with easy access to the Eiffel Tower, cafés, museums, and romantic streets.",
    image: {
      filename: "listingimage",
      url: "https://images.squarespace-cdn.com/content/v1/52da9677e4b03d314575985a/cb243644-a6cc-4235-aacd-4ee13965d76c/Best+Hotels+in+Paris+with+a+View+-+Four+Seasons+Hotel+George+V+Paris.jpg"
    },
    price: 2400,
    location: "Paris",
    country: "France",
   category: "rooms"

  },

  {
    title: "Clifftop Santorini Retreat",
    description: "Enjoy breathtaking Aegean Sea views from this charming whitewashed home near the famous blue-domed villages.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff"
    },
    price: 3200,
    location: "Santorini",
    country: "Greece",
    category:"rooms"
  },

  {
    title: "Luxury Downtown Dubai Suite",
    description: "Experience modern Dubai from a luxurious apartment close to the Burj Khalifa, Dubai Mall, and vibrant city attractions.",
    image: {
      filename: "listingimage",
      url: "https://www.hotels-dubai.org/data/Photos/OriginalPhoto/15854/1585445/1585445355/photo-dubai-11.JPEG"
    },
    price: 3500,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "castles",
  },

  {
    title: "Tokyo City Loft",
    description: "Modern city loft surrounded by Tokyo's famous restaurants, shopping districts, neon streets, and cultural attractions.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
    },
    price: 2100,
    location: "Tokyo",
    country: "Japan"
  },

  {
    title: "Maldives Ocean Bungalow",
    description: "Wake up above turquoise waters in a peaceful overwater bungalow with spectacular ocean views and private access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8"
    },
    price: 4500,
    location: "Malé",
    country: "Maldives"
  },

  {
    title: "New York Skyline Apartment",
    description: "Stay in the heart of New York with spectacular skyline views and convenient access to Times Square and Central Park.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522083165195-3424ed129620"
    },
    price: 2800,
    location: "New York City",
    country: "United States"
  },

  {
    title: "Venice Canal House",
    description: "Experience Venice from a charming traditional home located near beautiful canals, historic bridges, and local cafés.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9"
    },
    price: 2200,
    location: "Venice",
    country: "Italy"
  },

  {
    title: "Swiss Alps Mountain Chalet",
    description: "Escape to a cozy wooden chalet surrounded by majestic mountains, peaceful forests, and scenic hiking trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7"
    },
    price: 2600,
    location: "Zermatt",
    country: "Switzerland",
     category: "castles",
  },

  {
    title: "Amalfi Coast Sea View Villa",
    description: "Enjoy spectacular Mediterranean views from this elegant villa overlooking the colorful villages of the Amalfi Coast.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca"
    },
    price: 3900,
    location: "Amalfi",
    country: "Italy",
     category: "castles",
  },

  {
    title: "London Riverside Apartment",
    description: "Explore historic London from this comfortable apartment near the Thames, Tower Bridge, museums, and famous landmarks.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
    },
    price: 2300,
    location: "London",
    country: "United Kingdom",
     category: "farms",
  },

  {
    title: "Bora Bora Lagoon Villa",
    description: "Enjoy a peaceful tropical escape surrounded by turquoise lagoons, coral reefs, and incredible island scenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },
    price: 4800,
    location: "Bora Bora",
    country: "French Polynesia",
     category: "camping",
  },

  {
    title: "Marrakech Riad Retreat",
    description: "Stay in a traditional Moroccan riad featuring beautiful architecture, a peaceful courtyard, and easy access to the souks.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70"
    },
    price: 1400,
    location: "Marrakech",
    country: "Morocco",
     category: "iconic",
  },

  {
    title: "Istanbul Bosphorus Residence",
    description: "Discover Istanbul from a stylish residence offering easy access to historic mosques, markets, and the Bosphorus.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200"
    },
    price: 1600,
    location: "Istanbul",
    country: "Turkey",
    category: "castles",
  },

  {
    title: "Cape Town Ocean View Home",
    description: "Relax in a modern home with beautiful ocean views and convenient access to Table Mountain and Cape Town's beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99"
    },
    price: 1900,
    location: "Cape Town",
    country: "South Africa"
  },

  {
    title: "Sydney Harbour Apartment",
    description: "Stay near Sydney Harbour with easy access to the Opera House, Harbour Bridge, beaches, restaurants, and nightlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9"
    },
    price: 2500,
    location: "Sydney",
    country: "Australia"
  },

  {
    title: "New Zealand Lakeside Cabin",
    description: "Enjoy a peaceful cabin surrounded by dramatic mountains, clear lakes, and beautiful New Zealand wilderness.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad"
    },
    price: 1700,
    location: "Queenstown",
    country: "New Zealand"
  },

  {
    title: "Hawaiian Beach House",
    description: "Spend your vacation in a relaxing beach house with tropical surroundings, ocean views, and beautiful Hawaiian sunsets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505881502353-a1986add3762"
    },
    price: 2900,
    location: "Honolulu",
    country: "United States"
  },
];

module.exports = { data: sampleListings };