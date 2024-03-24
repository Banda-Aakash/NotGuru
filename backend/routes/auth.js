const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET = "HihihI"

//Route 1:creating a user : localhost:5000/api/auth/createuser
router.post('/createuser', [
    body('name', "Enter a valid Name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 charecters").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    success=false
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json(success,"This user already exists")
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            username: req.body.name,
            email: req.body.email,
            password: secPass,
        })


        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success,authtoken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error!!")
    }
})

//Route 2:login :localhost:5000/api/auth/login
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password should'nt be empty").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Please try to logine with existing credentials" });
        }
        const passwordcmp = await bcrypt.compare(password, user.password); 4
        if (!passwordcmp) {
            success=false
            return res.status(400).json({success, errors: "Please try to logine with existing credentials" });
        }
        const data = {
            id: user.id
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error!!")
    }

})


//Route 3:Get user details :localhost:5000/api/auth/getuser
router.post('/getuser',fetchuser, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error!!")
    }
})

module.exports = router