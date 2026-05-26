const mongoose = require("mongoose");
const Category = require("../models/Category");
require("dotenv").config();

const sendCategoryData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Category.deleteMany({}); // Clear existing data

        await Category.create([
            { name: "entrees" },
            { name: "mains" },
            { name: "desserts" },
            { name: "drinks" },
            { name: "sides" },
            { name: "specials" }
        ]);
        console.log("Data sent successfully");
        mongoose.connection.close();
    }
    catch (err) {
        console.error("Error sending data:", err);
        mongoose.connection.close();
    }
};

sendCategoryData();
