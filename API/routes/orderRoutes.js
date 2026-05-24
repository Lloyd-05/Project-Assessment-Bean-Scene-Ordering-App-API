/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - tableCode
 *         - dateTime
 *         - status
 *         - menuItems
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the order
 *         tableCode:
 *           type: string
 *           description: Table code placing the order
 *         dateTime:
 *           type: string
 *           format: date-time
 *           description: When the order was placed
 *         status:
 *           type: string
 *           description: Order status (pending, preparing, served)
 *         menuItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               menuItem:
 *                 type: string
 *                 description: Menu item ID
 *               quantity:
 *                 type: integer
 *                 description: Quantity ordered
 *       example:
 *         tableCode: "T1"
 *         dateTime: "2024-06-01T12:00:00Z"
 *         status: "pending"
 *         menuItems:
 *           - menuItem: "60c72b2f9b1d8e5a5c8f9a1"
 *             quantity: 2
 *           - menuItem: "60c72b2f9b1d8e5a5c8f9a2"
 *             quantity: 1
 */

const router = require("express").Router();
const Order = require("../models/Order");

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: `Error fetching orders: ${err.message}` });
  }
});

/**
 * @swagger
 * /orders/search:
 *   get:
 *     summary: Search orders by table code
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: ques
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword for table code
 *     responses:
 *       200:
 *         description: Matching orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
router.get("/search", async (req, res) => {
  try {
    const ques = req.query.ques;
    const orders = await Order.find({
      tableCode: { $regex: ques, $options: "i" },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: `Error searching orders: ${err.message}` });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: The requested order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: `Error fetching order: ${err.message}` });
  }
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid order data
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  const { tableCode, dateTime, status, menuItems } = req.body;
  const order = new Order({ tableCode, dateTime, status, menuItems });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: `Error creating order: ${err.message}` });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Replace an existing order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The updated order
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid order data
 *       500:
 *         description: Server error
 */
router.put("/:id", async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updateOrder);
  } catch (err) {
    res.status(400).json({ message: `Error updating order: ${err.message}` });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Partially update an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The updated order
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid order data
 *       500:
 *         description: Server error
 */
router.patch("/:id", async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updateOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Deleted order" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
