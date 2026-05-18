const router = require("express").Router();
const Menu = require("../models/Menu");

// Get all menu items
router.get("/", async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: `Error fetching menu items: ${err.message}` });
    }
});
//Search menu items by name 
router.get("/search", async (req, res) => {
    try {
        const ques = req.query.ques;
        const items = await Menu.find({
            name: { $regex: ques, $options: 'i' }
        });

        res.json(items);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific menu item by ID
router.get("/:id", async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new menu item
router.post("/", async (req, res) => {
    const { name, description, category, price, photo, dietaryFlags, Availability } = req.body;
    const menuItem = new Menu({
        name,
        description,
        category,
        price,
        photo,
        dietaryFlags,
        Availability
    });
    try {
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//replace a menu item
router.put("/:id", async (req, res) => {

    try {
        const updateMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!updateMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updateMenuItem);
    } catch (err) {
        res.status(400).json({ message: `Error updating menu item: ${err.message}` });
    } 
});

//partial update a menu item
router.patch("/:id", async (req, res) => {
    try {
        const updateMenuFields = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateMenuFields) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updateMenuFields);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete a menu item
router.delete("/:id", async (req, res) => {
    try {
        const deletedMenuItem = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Deleted menu item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;