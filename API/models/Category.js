//TODO: Implement the Category model for the menu categories. This will allow us to have a separate collection for categories, and we can reference the category in the Menu model instead of using an enum. This will make it easier to add new categories in the future without having to change the code.

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }

},
    {
        collection: "Category"
    });

module.exports = mongoose.model("Category", categorySchema);