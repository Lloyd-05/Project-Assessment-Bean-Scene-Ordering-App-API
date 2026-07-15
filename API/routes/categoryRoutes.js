/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the category
 *         name:
 *           type: string
 *           description: Category name
 *       example:
 *         name: "Drinks"
 */

const router = require("express").Router();
const Category = require("../models/Category");
const auth = require("../middleware/auth");
const authorizeRole = require("../middleware/roleAuth");

/**
 * @swagger
 * /menu-categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
router.get("/", auth, authorizeRole("staff", "manager"), async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: `Error fetching categories: ${err.message}` });
  }
});

/**
 * @swagger
 * /menu-categories/search:
 *   get:
 *     summary: Search categories by name
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword for category name
 *     responses:
 *       200:
 *         description: Matching categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
router.get("/search",auth, authorizeRole("staff", "manager"), async (req, res) => {
  try {
    const query = req.query.query;
    const categories = await Category.find({
      name: { $regex: query, $options: "i" },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: `Error searching categories: ${err.message}` });
  }
});

/**
 * @swagger
 * /menu-categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get("/:id",auth, authorizeRole("staff", "manager"), async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: `Error fetching category: ${err.message}` });
  }
});

/**
 * @swagger
 * /menu-categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid category data
 */
router.post("/", auth, authorizeRole("manager"), async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: `Error creating category: ${err.message}` });
  }
});

/**
 * @swagger
 * /menu-categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Category]
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
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       400:
 *         description: Invalid category data
 */
router.put("/:id", auth, authorizeRole("manager"), async (req, res) => {
  const { name } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: `Error updating category: ${err.message}` });
  }
});

/**
 * @swagger
 * /menu-categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, authorizeRole("manager"), async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Deleted category" });
  } catch (err) {
    res.status(500).json({ message: `Error deleting category: ${err.message}` });
  }
});

module.exports = router;
