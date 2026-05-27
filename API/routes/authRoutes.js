const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }

    // 2. Compare the typed password with the Hashed password in DB
    // Bcrypt handles the 'salting' and 'comparing' for us.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }

    // 3. Create the Payload (What information do we want to carry?)
    const payload = {
      id: user._id,
      role: user.role
    };

    // 4. Sign the Token
    // We use a Secret Key from our .env and set an expiration time.
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // Token dies after 2 hours
    );

    // 5. Send the token back to the client (React Native, Postman, etc.)
    res.json({
      message: "Login Successful",
      token: `Bearer ${token}`, // We add 'Bearer' to follow industry standards
      user: { username: user.username, role: user.role }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/logout", async (req, res) => {
    const { username, password } = req.body;
    
    try {
    const user = await User.findOne({ username });
    res.json({message: "Successfully logged out"})
    }
    catch(err){
          res.status(500).json({ message: "Logout failled" });

    }
})

module.exports = router;