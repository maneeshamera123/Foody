const express = require('express')
const router = express.Router()
const { client } = require('../db')

router.post('/MyOrderData', async (req, res) =>{
    const MyOrder = client.db("gofood").collection("order");

    try {
        const mydata = await MyOrder.findOne({'email':req.body.email});
        res.status(200).json(mydata.order_data)
    } catch (err) {
        console.error("Error retrieving order history:", err);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;