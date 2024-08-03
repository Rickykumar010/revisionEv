
const express=require('express');
const { userModel } = require('../model/userSchema');
const userRouter=express.Router();
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');


userRouter.post("/register", async (req, res) => {
    const saltRound = 10;
    const { name, email, password } = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const hashPassword = await bcrypt.hash(password, saltRound);
        const isUser = new userModel({ name, email, password: hashPassword });
        await isUser.save();
        res.status(201).json({ isUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user._id, email: user.email }, 'secret', { expiresIn: '1h' });
                res.status(200).json({ message: "Login successful", token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});

module.exports={userRouter}