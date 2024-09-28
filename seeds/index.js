const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
console.log("hello");


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '66edc8509c01f3bdd33f5844',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: `https://picsum.photos/400?random=${Math.random()*100}`,
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: `https://picsum.photos/400?random=${Math.random()*100}`,
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ]
        })
        // Attempt to seed database with geocoder coordinate data. Did not work...
        // const geoData = await geocoder.forwardGeocode({
        //     query: req.body.campground.location,
        //     limit: 1
        // }).send()
        // campground.geometry = geoData.body.features[0].geometry;
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})