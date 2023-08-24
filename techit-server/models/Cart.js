const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    // products: [{
    //     productId: { type: String },
    //     name: { type: String },
    //     price: { type: Number },
    //     category: { type: String },
    //     description: { type: String },
    //     image: { type: String },
    //     quantity: { type: Number }
    // }],
    products: {
        type: Array,
        required: true
    },
    active: {
        type: Boolean
    }
})

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;