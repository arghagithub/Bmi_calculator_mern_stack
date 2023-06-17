const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Admin = require('../model/Admin');
const fetchadmin = require('../middleware/fetchadmin');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWTSecret = "~!@#$%&*()_+";

router.post('/adminsignup', [
    body('name', 'name sholud not be blank').exists(),
    body('email', 'please use a valid email').isEmail(),
    body('password', 'password should not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            return res.status(401).json({ success: false, message: 'Admin already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        admin = await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })

        return res.status(200).json({ success: true, message: 'successfully signed up' });

    } catch (error) {

    }
})

router.post('/adminlogin', [
    body('email', 'please use a valid email').isEmail(),
    body('password', 'password should not be blank').exists()
], async (req, res) => {
    try {
        const { email, password } = req.body;
        let admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(400).json({ success: false, message: 'wrong user credentials' });
        }

        const compare = await bcrypt.compare(password, admin.password);
        if (!compare) {
            return res.status(400).json({ success: false, message: 'wrong user credentials' });
        }
        const data = {
            admin: {
                id: admin.id
            }
        }
        const token = jwt.sign(data, JWTSecret);
        return res.status(200).json({ success: true, message: 'successfully logged in', adminlogintoken: token });
    } catch (error) {
        console.log("Internal server error");
    }
})

router.post('/signup', fetchadmin, [
    body('name', 'name sholud not be blank').exists(),
    body('email', 'please use a valid email').isEmail(),
    body('password', 'password should not be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(401).json({ success: false, message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            admin: req.admin.id,
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })
        return res.status(200).json({ success: true, message: 'successfully signed up' });

    } catch (error) {
        console.log("Internal server error");
    }
})

router.post('/login', [
    body('email', 'please use a valid email').isEmail(),
    body('password', 'password should not be blank').exists()
], async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'wrong user credentials' });
        }
        const compare = await bcrypt.compare(req.body.password, user.password);
        if (!compare) {
            return res.status(400).json({ success: false, message: 'wrong user credentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWTSecret);
        return res.status(200).json({ success: true, message: 'successfully logged in', userlogintoken: token });
    } catch (error) {
        console.log('Internal server error');
    }
})

router.get('/getuserdetail', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: 'user does not exists' });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Internal server error");
    }
})

router.delete('/deleteuser', fetchuser, fetchadmin, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success: false, message: 'user does not exists' });
        }
        if (req.admin.id !== user.admin.toString()) {
            return res.status(400).json({ success: false, message: 'wrong user credentials' });
        }
        user = await User.findByIdAndDelete(req.user.id);
        return res.json({ success: true, message: 'user successfully deleted' });
    } catch (error) {
        res.json({error:error})
        console.log('Internal server error');
    }
})

router.put('/updateuser', fetchadmin, fetchuser, [
    body('name', 'name sholud not be blank').exists(),
    body('email', 'please use a valid email').isEmail(),
    body('password', 'password should not be blank').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success: false, message: 'user does not exists' });
        }
        if (req.admin.id !== user.admin.toString()) {
            return res.status(400).json({ success: false, message: 'wrong user credentials' });
        }
        let newuser = {};
        if (req.body.name) {
            newuser.name = req.body.name;
        }
        if (req.body.email) {
            newuser.email = req.body.email;
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt);
            newuser.password = secpass;
        }
        user = await User.findByIdAndUpdate(req.user.id, { $set: newuser }, { new: true });
        return res.status(200).json({ success: true, message: 'User is update successfully', user });
    } catch (error) {
        console.log(error);
    }
})

router.get('/fetchalluser', fetchadmin, async (req, res) => {
    try {
        let user = await User.find({ admin: req.admin.id });
        if (!user) {
            return res.status(400).json({ success: false, message: 'users does not exists' });
        }
        return res.status(200).json({ success: true, user });

    } catch (error) {
        console.log('Internal server error');
    }
})


module.exports = router;