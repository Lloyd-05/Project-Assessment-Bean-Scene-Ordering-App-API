const router = require("express").Router();
const Table = require("../models/Table");

// Get all tables
router.get("/", async (req, res) => {
    try {
        const tables = await Table.find();
        res.json(tables);
    } catch (err) {
        res.status(500).json({ message: `Error fetching tables: ${err.message}` });
    }
});

//search tables by table code
router.get("/search", async (req, res) => {
    try {
        const ques = req.query.ques;
        const tables = await Table.find({
            tableCode: { $regex: ques, $options: 'i' }
        });
        res.json(tables);
    } catch (err) {
        res.status(500).json({ message: `Error searching tables: ${err.message}` });
    }
});

// Get a specific table by ID
router.get("/:id", async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.json(table);
    } catch (err) {
        res.status(500).json({ message: `Error fetching table: ${err.message}` });
    }
});

// Create a new table
router.post("/", async (req, res) => {
    const { area, tableCode } = req.body;
    try {
        const newTable = new Table({ area, tableCode });
        const savedTable = await newTable.save();
        res.status(201).json(savedTable);
    } catch (err) {
        res.status(400).json({ message: `Error creating table: ${err.message}` });
    }
});

// Update a table
router.put("/:id", async (req, res) => {
    const { area, tableCode } = req.body;
    try {
        const updatedTable = await Table.findByIdAndUpdate(
            req.params.id,
            { area, tableCode },
            { new: true }
        );
        if (!updatedTable) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.json(updatedTable);
    } catch (err) {
        res.status(400).json({ message: `Error updating table: ${err.message}` });
    }
});

//delete a table
router.delete("/:id", async (req, res) => {
    try {
        const deletedTable = await Table.findByIdAndDelete(req.params.id);
        if (!deletedTable) {
            return res.status(404).json({ message: 'Table not found' });
        }
        res.json({ message: 'Table deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: `Error deleting table: ${err.message}` });
    }
});

module.exports = router;