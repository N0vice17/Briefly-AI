const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config

exports.register = async (req,res) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password,10);
    const user = new User({ username, email, password: hashed})
    await user.save()
    res.status(201).json({msg: "User Registered"});
};

exports.login = async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({msg : "Invalid Credentials"});
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
    res.json({ token, userId: user._id, username: user.username})
};