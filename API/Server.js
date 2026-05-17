const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();


const app = express();
app.use(express.json());

app.use('/API/menu', require('./routes/menuRoutes'));
app.use('/API/orders', require('./routes/orderRoutes'));
app.use('/API/tables', require('./routes/tableRoutes'));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});