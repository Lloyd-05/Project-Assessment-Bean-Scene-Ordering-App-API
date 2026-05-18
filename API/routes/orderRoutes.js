const router = require('express').Router();
const Order = require('../models/Order');

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: `Error fetching orders: ${err.message}` });
    }
});

//search orders by table code
router.get("/search", async (req, res) => {
    try {
        const ques = req.query.ques;
        const orders = await Order.find({
            tableCode: { $regex: ques, $options: 'i' }
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: `Error searching orders: ${err.message}` });
    }
});

// Get a specific order by ID
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    }
    catch (err) {
        res.status(500).json({ message: `Error fetching order: ${err.message}` });
    }
});

// Create a new order
router.post("/", async (req, res) => {
    const { tableCode, dateTime, status, menuItems } = req.body;
    const order = new Order({
        tableCode,
        dateTime,
        status,
        menuItems
    });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    }
    catch (err) {
        res.status(400).json({ message: `Error creating order: ${err.message}` });
    }
});

//replace an order
router.put("/:id", async (req, res) => {

    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!updateOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updateOrder);
    } catch (err) {
        res.status(400).json({ message: `Error updating order: ${err.message}` });
    } 
});

//partial update an order
router.patch('/:id', async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updateOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete an order
router.delete("/:id", async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Deleted order' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
