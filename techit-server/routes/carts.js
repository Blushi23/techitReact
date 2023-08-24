const express = require("express");
const auth = require("../middleware/auth");
const Cart = require("../models/Cart")
const joi = require("joi");
const { route } = require("./register");

const router = express.Router()

const productSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required(),
    category: joi.string().required().min(2),
    description: joi.string().required().min(2),
    image: joi.string().required().min(2),
    _id: joi.string()
    // quantity: joi.number().required()
});

// add product to cart - product details in body
router.post("/", auth, async (req, res) => {
    try {

        //1. joi validation
        const { error } = productSchema.validate(req.body)
        if (error) return res.status(400).send(error);

        //2. find user cart
        let cart = await Cart.findOne({ userId: req.payload._id, active: true })

        if (!cart) return res.status(404).send("No active cart available for this user")

        //3. check if the product already exists in users cart
        let productToFind = cart.products.find((p) => p._id == req.body._id)
        if (productToFind) {
            //inc the quantity
            let indexToUpdate = cart.products.findIndex((p) => p._id == req.body._id)
            cart.products[indexToUpdate].quantity++;
            cart.markModified("products")
        }
        else {
            cart.products.push({ ...req.body, quantity: 1 })
        }

        //4. add product to cart
        await cart.save();

        //5. return a response
        res.status(201).send("Product added successfully to cart!")
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/", auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.payload._id, active: true });

        if (!cart)
            return res.status(404).send("No active cart available for this user");

        res.status(200).send(cart.products);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;