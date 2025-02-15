const express = require("express");
const Order = require("../models/OrdersAdmin");
const router = express.Router();

router.post("/place-order", async (req, res) => {
  try {
    const {
      userId,
      products,
      totalAmount,
      paymentMethod,
      address,
      paymentStatus,
    } = req.body;

    if (
      !userId ||
      !products ||
      products.length === 0 ||
      !totalAmount ||
      !paymentMethod ||
      !address
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newOrder = new Order({
      user: userId,
      products,
      totalAmount,
      paymentMethod,
      address,
      paymentStatus,
      orderStatus: "Pending", // Ensuring case matches schema enum
    });

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ error: "Failed to place order." });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "user"
    );
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.put("/admin/orders/:orderId", async (req, res) => {
  try {
    const { orderStatus, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus: orderStatus || status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

module.exports = router;
