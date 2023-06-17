const express = require("express");
const router = express.Router();
const Data = require('../model/Data');
const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');

router.post('/adddata', fetchuser, [
    body('name').exists(),
    body('age').exists(),
    body('gender').exists(),
    body('feet').exists(),
    body('inch').exists(),
    body('kg').exists(),
], fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, age, gender, feet, inch, kg } = req.body;
        let meterval = (parseFloat(feet) * 0.3048 + parseFloat(inch) * 0.0254).toFixed(2);
        let bmival = (parseFloat(kg) / Math.pow(meterval, 2)).toFixed(2);
        let health = '';
        if (bmival < 18.5) {
            health += 'underwait';
        }
        else if (bmival >= 18.5 && bmival <= 24.9) {
            health += 'normal wait';

        }
        else if (bmival >= 25.0 && bmival <= 29.9) {
            health += 'pre-obesity';
        }
        else {
            health += 'overweight';
        }
        const data = await Data.create({
            user: req.user.id,
            name: name,
            age: age,
            gender: gender,
            feet: feet,
            inch: inch,
            kg: kg,
            bmi: bmival,
            condition: health
        })
        return res.status(200).json({ success: true, message: 'Data is added successfully', data });
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/fetchdata', fetchuser, async (req, res) => {
    try {
        const data = await Data.find({ user: req.user.id });
        if (!data) {
            return res.status(400).json({ success: false, message: 'no data exists' });
        }
        else {
            return res.status(200).json({ success: true, data });
        }
    } catch (error) {
        console.log(error.message);
    }
})

router.put('/updatedata/:id', fetchuser, [
    body('name').exists(),
    body('age').exists(),
    body('gender').exists(),
    body('feet').exists(),
    body('inch').exists(),
    body('kg').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let data = await Data.findById(req.params.id);
        if (!data) {
            return res.status(400).json({ success: false, message: 'data does not exists' });
        }
        if (data.user.toString() !== req.user.id) {
            return res.status(400).json({ success: false, message: 'wrong user credentials' });
        }
        const { name, age, gender, feet, inch, kg } = req.body;
        let newdata = {};
        if (name) {
            newdata.name = name;
        }
        if (age) {
            newdata.age = age;
        }
        if (gender) {
            newdata.gender = gender;
        }
        if (feet) {
            newdata.feet = feet;
        }
        if (inch) {
            newdata.inch = inch;
        }
        if (kg) {
            newdata.kg = kg;
        }
        let meterval = (parseFloat(feet) * 0.3048 + parseFloat(inch) * 0.0254).toFixed(2);
        let bmival = (parseFloat(kg) / Math.pow(meterval, 2)).toFixed(2);
        let health = '';
        if (bmival < 18.5) {
            health += 'underwait';
        }
        else if (bmival >= 18.5 && bmival <= 24.9) {
            health += 'normal wait';

        }
        else if (bmival >= 25.0 && bmival <= 29.9) {
            health += 'pre-obesity';
        }
        else {
            health += 'overweight';
        }
        newdata.bmi = bmival;
        newdata.condition = health;
        data = await Data.findByIdAndUpdate(req.params.id, { $set: newdata }, { new: true });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.log('Internal server error');
    }
})

router.delete('/deletedata/:id', fetchuser, async (req, res) => {
    try {
        let data = await Data.findById(req.params.id);
        if (!data) {
            return res.status(400).json({ success: false, message: 'data does not exists' });
        }
        if (data.user.toString() !== req.user.id) {
            return res.status(400).json({ success: false, message: 'wrong user credentials' });
        }
        data=await Data.findByIdAndDelete(req.params.id);
        return res.status(200).json({success:true,message:'data is deleted successfuly'});
    } catch (error) {
        console.log('Internal server error');
    }
})


module.exports = router;