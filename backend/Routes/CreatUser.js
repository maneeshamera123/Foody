const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { client } = require('../db');
const { body, validationResult } = require('express-validator');

const bcrpt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSec="€486745896€$@fdhhsgpbkjhYUVYUDTYh"

router.post('/creatuser',
    [body('email', 'not a valid email').isEmail(),
    body('password', 'please enter strong password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrpt.genSalt(8);
        const secPassword = await bcrpt.hash(req.body.password, salt);

        try {
            const data_to_insert = {
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location
            }
            const collection = client.db("gofood").collection("user");
            const newDocument = new User(data_to_insert);
            await collection.insertOne(newDocument);
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false });
        }

    })

router.post('/loginuser',
    [body('email', 'not a valid email').isEmail(),
    body('password', 'please enter strong password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            const collection = client.db("gofood").collection("user");
            // collection.findOne({ email }).then((userData) => {
            let userData = await collection.findOne({ email });
            if (!userData) {
                console.log("User not found");
                res.status(400).json({ message: "Credential does't matched" });
            }

            const compare = await bcrpt.compare(req.body.password, userData.password);
            if (!compare) {
                console.log("Incorrect password");
                res.status(400).json({ message: "Credential does't matched" });
            }
            
            const data={
                user:{
                    id : userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSec)
            res.json({ success: true,authToken:authToken });
             
        } catch (error) {
            console.log(error);
            res.status(400).json({ success: false });
        }

    })

module.exports = router;
