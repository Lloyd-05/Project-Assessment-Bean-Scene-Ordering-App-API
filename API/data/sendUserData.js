const mongoose = require('mongoose');
const User = require('../models/User');
require("dotenv").config({ path: "./.env" });

const sendUserData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await User.deleteMany({}); // Clear existing data
        await User.create([
            { 
                username: "manager1",
                password: "password123",
                role: "manager"
            },
            {
                username: "staff1",
                password: "password456",
                role: "staff"
            },
            {
                username: "staff2",
                password: "password789",
                role: "staff"
            }
        ]);

        console.log("Data sent successfully");
        mongoose.connection.close();
    
    } catch (err) {
        console.error("Error sending data:", err);
        mongoose.connection.close();
    }
};

sendUserData();