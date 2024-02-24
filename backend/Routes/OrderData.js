const express = require('express')
const router = express.Router()
const OrderSchema = require('../models/Orders')
const { client } = require('../db');



router.post('/orderData', async (req, res) => {

    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    //if email not exisitng in db then create: else: InsertMany()

    const Order = client.db("gofood").collection("order");

    const eId = await Order.findOne({ email: req.body.email });

    if (eId === null) {
        try {
            const newOrder = new OrderSchema({
                email: req.body.email,
                order_data: [data]
            });
            await Order.insertOne(
                newOrder
            );
            res.json({ success: true });
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ success: false, error: "Failed to create order" });
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
})

module.exports = router;