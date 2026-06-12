//TODO: add a timer to the session model, and a function to check if the session has expired. If it has, delete the session from the database.

const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Session expires after 7 days
    }
},
    {
        collection: "Session"
    },
);

module.exports = mongoose.model("Session", sessionSchema);