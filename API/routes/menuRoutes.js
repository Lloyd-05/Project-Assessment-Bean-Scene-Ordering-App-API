const router = require("express").Router();
const Menu = require('../models/Menu');

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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
        const menuItems = new Menu(req.body);
        await menuItems.save();
        res.status(201).json(menuItems);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

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


//replace a menu item
router.put('/:id', async (req, res) => {
    const { name, description, category, price, photo, dietaryFlags, Availability } = req.body;

    if (!name || !category || price == null || dietaryFlags == null || Availability == null) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updatedMenuItem);
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
        const updateMenuFields = await Menu.findByIdAndModify(req.params.id, req.body, { new: true });
        if (!updateMenuFields) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updateMenuFields);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Search menu items by name or category
router.get('/search', async (req, res) => {
    const { name, category } = req.query;
    try {
        const query = req.query.query;
        const items = await Menu.find({ name: { $regex: query, $options: 'i' } });

        res.json(items);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

});


//delete a menu item
router.delete('/:id', async (req, res) => {
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