const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // select: false // Exclude password from query results by default
    },
    role: {
        type: String,
        enum: ['staff', 'manager'],
        required: true,
        default: 'staff'
    },
},
    {
        collection: 'User'
    }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    // in real app, you'd handle error
  }
});

module.exports = mongoose.model('User', userSchema);