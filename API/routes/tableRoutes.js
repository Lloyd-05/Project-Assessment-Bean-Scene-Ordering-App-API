/**
 * @swagger
 * tags:
 *   name: Table
 *   description: Table management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Table:
 *       type: object
 *       required:
 *         - area
 *         - tableCode
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the table
 *         area:
 *           type: string
 *           description: Area of the restaurant (e.g., indoor, outdoor, VIP)
 *         tableCode:
 *           type: string
 *           description: Unique table code (e.g., T1, T2)
 *       example:
 *         area: "main"
 *         tableCode: "T1"
 */

const router = require("express").Router();
const Table = require("../models/Table");
const auth = require("../middleware/auth");
const authorizeRole = require("../middleware/roleAuth");

/**
 * @swagger
 * /table:
 *   get:
 *     summary: Get all tables
 *     tags: [Table]
 *     responses:
 *       200:
 *         description: A list of tables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Table'
 *       500:
 *         description: Server error
 */
router.get("/", auth, authorizeRole("staff", "manager"), async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: `Error fetching tables: ${err.message}` });
  }
});

/**
 * @swagger
 * /table/search:
 *   get:
 *     summary: Search tables by table code
 *     tags: [Table]
 *     parameters:
 *       - in: query
 *         name: ques
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword for table code
 *     responses:
 *       200:
 *         description: Matching tables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Table'
 *       500:
 *         description: Server error
 */
router.get("/search", auth, authorizeRole("staff", "manager"), async (req, res) => {
  try {
    const query = req.query.query;
    const tables = await Table.find({
      tableCode: { $regex: query, $options: "i" },
    });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: `Error searching tables: ${err.message}` });
  }
});

/**
 * @swagger
 * /table/{id}:
 *   get:
 *     summary: Get a specific table by ID
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       404:
 *         description: Table not found
 *       500:
 *         description: Server error
 */
router.get("/:id", auth, authorizeRole("staff", "manager"), async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json(table);
  } catch (err) {
    res.status(500).json({ message: `Error fetching table: ${err.message}` });
  }
});

/**
 * @swagger
 * /table:
 *   post:
 *     summary: Create a new table
 *     tags: [Table]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       201:
 *         description: The created table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       400:
 *         description: Invalid table data
 *       500:
 *         description: Server error
 */
router.post("/", auth, authorizeRole("manager"), async (req, res) => {
  const { area, tableCode } = req.body;
  try {
    const newTable = new Table({ area, tableCode });
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (err) {
    res.status(400).json({ message: `Error creating table: ${err.message}` });
  }
});

/**
 * @swagger
 * /table/{id}:
 *   put:
 *     summary: Update a specific table by ID
 *     tags: [Table]
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
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       200:
 *         description: The updated table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       400:
 *         description: Invalid table data
 *       404:
 *         description: Table not found
 *       500:
 *         description: Server error
 */
router.put("/:id", auth, authorizeRole("manager"), async (req, res) => {
  const { area, tableCode } = req.body;
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      { area, tableCode },
      { new: true }
    );
    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json(updatedTable);
  } catch (err) {
    res.status(400).json({ message: `Error updating table: ${err.message}` });
  }
});

/**
 * @swagger
 * /table/{id}:
 *   delete:
 *     summary: Delete a specific table by ID
 *     tags: [Table]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Table deleted successfully
 *       404:
 *         description: Table not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, authorizeRole("manager"), async (req, res) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);
    if (!deletedTable) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.json({ message: "Table deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: `Error deleting table: ${err.message}` });
  }
});

module.exports = router;