const router = require("express").Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: `Error fetching users: ${err.message}` });
    }
});

// Search users by username
router.get("/search", async (req, res) => {
    try {
        const ques = req.query.ques;
        const users = await User.find({
            username: { $regex: ques, $options: 'i' }
        });
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: `Error searching users: ${err.message}` });
    }
});

// Get a specific user by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: `Error fetching user: ${err.message}` });
    }
});

// Create a new user
router.post("/", async (req, res) => {
    const { username, password, role } = req.body;
    const user = new User({
        username,
        password,
        role
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: `Error creating user: ${err.message}` });
    }
});

// Update a user
router.put("/:id", async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, password, role },
            { new: true }
        );  
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    }   
    catch (err) {
        res.status(400).json({ message: `Error updating user: ${err.message}` });
    }
});

// Partial update a user
router.patch("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: `Error updating user: ${err.message}` });
    }
});

// Delete a user
router.delete("/:id", async (req, res) => {
    try {        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: `Error deleting user: ${err.message}` });
    }
});

module.exports = router;