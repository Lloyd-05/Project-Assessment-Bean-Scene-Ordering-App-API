const mongoose = require("mongoose");
const Menu = require("../models/Menu");
const Category = require("../models/Category");
require("dotenv").config({ path: "./.env" });

const sendMenuData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Menu.deleteMany({}); // Clear existing data

        // Fetch categories first
        const entreesCategory = await Category.findOne({ name: "Entrees" });
        const mainsCategory = await Category.findOne({ name: "Mains" });
        const dessertsCategory = await Category.findOne({ name: "Desserts" });
        const drinksCategory = await Category.findOne({ name: "Drinks" });
        const sidesCategory = await Category.findOne({ name: "Sides" });
        const specialsCategory = await Category.findOne({ name: "Specials" });

        await Menu.create([
            {
                name: "Cappuccino",
                description: "Espresso with steamed milk and a layer of foam",
                category: drinksCategory._id,
                price: 3.5,
                photo: null,
                dietaryFlags: ["vegan", "Contains dairy"],
                Availability: true
            },
            {
                name: "Avocado Toast",
                description: "Toasted bread topped with mashed avocado, cherry tomatoes, and a sprinkle of chili flakes",
                category: entreesCategory._id,
                price: 7.0,
                photo: null,
                dietaryFlags: ["vegan", "gluten-free"],
                Availability: true
            },
            {
                name: "Chocolate Cake",
                description: "Rich and moist chocolate cake with a layer of chocolate ganache",
                category: dessertsCategory._id,
                price: 5.0,
                photo: null,
                dietaryFlags: ["Contains dairy"],
                Availability: true
            },
            {
                name: "Caesar Salad",
                description: "Crisp romaine lettuce tossed with Caesar dressing, croutons, and Parmesan cheese",
                category: sidesCategory._id,
                price: 6.0,
                photo: null,
                dietaryFlags: ["Contains dairy"],
                Availability: true
            },
            {
                name: "Steak Sandwich",
                description: "Grilled steak served on a toasted bun with caramelized onions and horseradish sauce",
                category: mainsCategory._id,
                price: 12.0,
                photo: null,
                dietaryFlags: ["Contains dairy"],
                Availability: true
            },
            {
                name: "Smashed Pavlova",
                description: "A deconstructed version of the classic pavlova, featuring a meringue base topped with whipped cream and fresh berries",
                category: specialsCategory._id,
                price: 8.0,
                photo: null,
                dietaryFlags: ["Contains dairy"],
                Availability: true
            }
        ]);

        console.log("Data sent successfully");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error sending data:", err);
        mongoose.connection.close();
    }
};

sendMenuData();