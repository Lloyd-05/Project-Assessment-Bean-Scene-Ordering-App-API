const mongoose = require('mongoose');
const Table = require('../models/Table');
require("dotenv").config();

const sendTableData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        await Table.deleteMany({}); // Clear existing data
        await Table.create([
            { 
                area: "main", 
                tableCode: "M1" 
            },
            { 
                area: "main", 
                tableCode: "M2" 
            },
            { 
                area: "main", 
                tableCode: "M3" 
            },
            {
                area: "main",
                tableCode: "M4"
            },
            {
                area: "main",
                tableCode: "M5"
            },

            {
                area: "main",
                tableCode: "M6"
            },
            {
                area: "main",
                tableCode: "M7"
            },
            {
                area: "main",
                tableCode: "M8"
            },
            {
                area: "main",
                tableCode: "M9"
            },
            {
                area: "main",
                tableCode: "M10"
            },
            {
                area: "outside",
                tableCode: "O1"
            },
            {
                area: "outside",
                tableCode: "O2"
            },
            {
                area: "outside",
                tableCode: "O3"
            },
            {
                area: "outside",
                tableCode: "O4"
            },
            {
                area: "outside",
                tableCode: "O5"
            },

            {
                area: "outside",
                tableCode: "O6"
            },

            {
                area: "outside",
                tableCode: "O7"
            },

            {
                area: "outside",
                tableCode: "O8"
            },

            {
                area: "outside",
                tableCode: "O9"
            },

            {
                area: "outside",
                tableCode: "O10"
            },

            {
                area: "balcony",
                tableCode: "B1"
            },
            
            {
                area: "balcony",
                tableCode: "B2"
            },
            {
                area: "balcony",
                tableCode: "B3"
            },
            {
                area: "balcony",
                tableCode: "B4"
            },
            {
                area: "balcony",
                tableCode: "B5"
            },
            {
                area: "balcony",
                tableCode: "B6"
            },
            {
                area: "balcony",
                tableCode: "B7"
            },
            {
                area: "balcony",
                tableCode: "B8"
            },
            {
                area: "balcony",
                tableCode: "B9"
            },
            
            {
                area: "balcony",
                tableCode: "B10"
            }
        ]);

        console.log("Data sent successfully");
        mongoose.connection.close();
        
    } catch (err) {
        console.error("Error sending data:", err);
        mongoose.connection.close();
    }
};

sendTableData();