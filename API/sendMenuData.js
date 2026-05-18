const mongoose = require("mongoose");
const Menu = require("./models/Menu");
require("dotenv").config();

const sendMenuData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Menu.deleteMany({}); // Clear existing data

        await Menu.create([
            {
                MenuItemID: new mongoose.Types.ObjectId(),
                name: "Cappuccino",
                description: "Espresso with steamed milk and a layer of foam",
                category: "drinks",
                price: 3.5,
                photo: null,
                dietaryFlags: ["vegan", "Contains dairy"],
                Availability: true
            },
            {
                MenuItemID: new mongoose.Types.ObjectId(),
                name: "Avocado Toast",
                description: "Toasted bread topped with mashed avocado, cherry tomatoes, and a sprinkle of chili flakes",
                category: "entrees",
                price: 7.0,
                photo: null,
                dietaryFlags: ["vegan", "gluten-free"],
                Availability: true
            },
            {
                MenuItemID: new mongoose.Types.ObjectId(),
                name: "Chocolate Cake",
                description: "Rich and moist chocolate cake with a layer of chocolate ganache",
                category: "desserts",
                price: 5.0,
                photo: null,
                dietaryFlags: ["Contains dairy"],
                Availability: true
            },
            {
                MenuItemID: new mongoose.Types.ObjectId(),
                name: "Caesar Salad",
                description: "Crisp romaine lettuce tossed with Caesar dressing, croutons, and Parmesan cheese",
                category: "sides",
                price: 6.0,
                photo: null,
                dietaryFlags: ["Contains dairy"],
                Availability: true
            },
            {
                MenuItemID: new mongoose.Types.ObjectId(),
                name: "Steak Sandwich",
                description: "Grilled steak served on a toasted bun with caramelized onions and horseradish sauce",
                category: "mains",
                price: 12.0,
                photo: null,
                dietaryFlags: ["Contains dairy"],
                Availability: true
            },
            {
                MenuItemID: new mongoose.Types.ObjectId(),
                name: "Smashed Pavlova",
                description: "A deconstructed version of the classic pavlova, featuring a meringue base topped with whipped cream and fresh berries",
                category: "specials",
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