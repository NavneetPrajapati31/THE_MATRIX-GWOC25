const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// ✅ Get Cart Items for a User
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}); 
 
// ✅ Add Product to Cart
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, name, price, image } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, name, price, image, quantity: 1 });
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
    console.log(error)
  }
});

// ✅ Remove Product from Cart
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove from cart" });
  }
});

module.exports = router;
