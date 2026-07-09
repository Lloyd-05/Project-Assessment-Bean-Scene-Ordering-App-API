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
    expiresAt: {
        type: Date,
        // default: Date.now,
        required: true,
        index: { expires: '7d' } // Session expires after 7 days
    }
},
    {
        collection: "Session"
    },
);

module.exports = mongoose.model("Session", sessionSchema);