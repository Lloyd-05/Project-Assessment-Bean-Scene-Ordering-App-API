const mongoose = require("mongoose");
const order = require("./models/Order");
const menu = require("./models/Menu");
require("dotenv").config();

const sendOrderData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await order.deleteMany({}); // Clear existing data

        // Fetch menu items to reference in orders
        const Cappuccino = await menu.findOne({ name: "Cappuccino" });
        const AvocadoToast = await menu.findOne({ name: "Avocado Toast" });
        const ChocolateCake = await menu.findOne({ name: "Chocolate Cake" });
        const CaesarSalad = await menu.findOne({ name: "Caesar Salad" });
        const SteakSandwich = await menu.findOne({ name: "Steak Sandwich" });

        await order.create([
            {
                tableCode: "M1",
                dateTime: new Date(),
                status: "in-progress",
                menuItems: [
                    {
                        menuItemId: Cappuccino._id,
                        quantity: 2
                    },
                    {
                        menuItemId: AvocadoToast._id,
                        quantity: 1
                    },
                    {
                        menuItemId: ChocolateCake._id,
                        quantity: 1,
                    }
                ]
            },
            {
                tableCode: "O2",
                dateTime: new Date(),
                status: "completed",
                menuItems: [
                    {
                        menuItemId: CaesarSalad._id,
                        quantity: 1
                    },
                    {
                        menuItemId: SteakSandwich._id,
                        quantity: 2
                    }
                ]
            }
        ]);
        console.log("Data sent successfully");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error sending data:", err);
        mongoose.connection.close();
    }
};

sendOrderData();