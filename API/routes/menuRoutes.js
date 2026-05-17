const express= require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// Get a specific menu item by ID
router.get('/:id', async (req, res) => {
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

//Search menu items by name or category
router.get('/search', async (req, res) => {
    const { name, category } = req.query;
    try {
        const query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }
        if (category) {
            query.category = category;
        }   
        const menuItems = await Menu.find(query);
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// create a new menu item
router.post('/', async (req, res) => {
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

//partial update a menu item
router.patch('/:id', async (req, res) => {
    const { name, description, category, price, photo, dietaryFlags, Availability } = req.body;

    if (!name && !description && !category && price == null && photo == null && dietaryFlags == null && Availability == null) {
        return res.status(400).json({ message: 'No fields to update' });
    }
    try {
        const updatedMenuItem = await res.menuItem.save();
        res.json(updatedMenuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//replace a menu item
router.put('/:id', async (req, res) => {
    const { name, description, category, price, photo, dietaryFlags, Availability } = req.body;

    if (!name || !category || price == null || dietaryFlags == null || Availability == null) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const updatedMenuItem = await res.menuItem.save();
        res.json(updatedMenuItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete a menu item
router.delete('/:id', async (req, res) => {
    try {
        await res.menuItem.remove();
        res.json({ message: 'Deleted menu item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
