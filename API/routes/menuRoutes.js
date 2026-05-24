/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Menu management API
 */

const router = require("express").Router();
const Menu = require("../models/Menu");


/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: A list of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       500:
 *         description: Server error
 */


// Get all menu items
router.get("/", async (req, res) => {
    console.log("Calling")
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: `Error fetching menu items: ${err.message}` });
    }
});

/**
 * @swagger
 * /menu/search:
 *   get:
 *     summary: Search menu items by name
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: ques
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword for menu item name
 *     responses:
 *       200:
 *         description: Matching menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /menu/{id}:
 *   get:
 *     summary: Get a menu item by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Menu item created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Update a menu item by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Menu item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /menu/{id}:
 *   patch:
 *     summary: Partially update a menu item by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Menu item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item deleted
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */

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