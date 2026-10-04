StayHub

StayHub is a full-stack Airbnb-style listing platform where users can browse, create, edit, and review property listings. Built as a major project to practice server-side rendering, authentication, authorization, file uploads, and third-party API integration.

Live Demo
https://stayhub-m44d.onrender.com/


Features
User authentication — sign up, log in, log out, with secure password hashing via Passport.js
Listings CRUD — create, view, edit, and delete property listings
Ownership-based authorization — only a listing's owner can edit or delete it; only a review's author can delete it
Image uploads — listing photos stored on Cloudinary, not the server's local disk
Interactive map — each listing shows its location on a Mapbox map, with geocoding converting addresses to coordinates automatically
Reviews and ratings — users can leave star ratings and comments on listings
Category filtering — browse listings by category (Trending, Rooms, Castles, Pools, Camping, and more)
Search — search listings by title, location, or country
Flash messaging — success and error feedback shown after key actions
Responsive design — built with Bootstrap, adapts to mobile, tablet, and desktop screens
Tech Stack

Backend

Node.js & Express
MongoDB with Mongoose (hosted on MongoDB Atlas)
Passport.js (local strategy) for authentication
express-session with connect-mongo for session storage

Frontend

EJS templating with ejs-mate for layouts
Bootstrap 5
Vanilla JavaScript

Third-party services

Cloudinary — image storage and delivery
Mapbox — geocoding and interactive maps

Validation & error handling

Joi for server-side input validation
Custom error-handling middleware

What I Learned

Building StayHub involved working through real-world full-stack challenges: structuring an Express app with MVC architecture, securing routes with layered authorization middleware, integrating external APIs (Cloudinary, Mapbox) with proper error handling, debugging schema validation across create/update flows, and deploying a Node.js app with a cloud database to production.

Author
Nikita
