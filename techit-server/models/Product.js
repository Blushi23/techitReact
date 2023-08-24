const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        minlength: 2,
        required: true

    },
    description: {
        type: String,
        minlength: 2,
        required: true

    },
    image: {
        type: String,
        minlength: 2,
        required: true
    }
})

const Product = mongoose.model("products", productSchema);
module.exports = Product;