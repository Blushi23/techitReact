const express = require("express")
const joi = require("joi");
const User = require("../models/User");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const router = express.Router();

module.exports = router;

const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
    isAdmin: joi.boolean().required()
});

router.post("/", async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error)

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already exists");

        user = new User(req.body)

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        await user.save();

        // create user cart
        let cart = new Cart({ userId: user._id, products: [], active: true });

        await cart.save()

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin, email: user.email }, process.env.jwtKey)

        res.status(201).send(token)

    } catch (error) {
        res.status(400).send(error)
    }
})