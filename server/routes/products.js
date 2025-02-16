const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Products"); // Assuming you have a Product model
const router = express.Router();

// Route to fetch paginated products (with optional category filter)
router.get("/getProducts", async (req, res) => {
  try {
    let { page = 1, limit = 5, category, occasion } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (occasion) {
      filter.occasion = occasion;
    }

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter); // Total products in DB (filtered)

    res.json({
      success: true,
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to fetch a product by ID
router.get("/get-details/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/products/latest", async (req, res) => {
  try {
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(latestProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest products", error });
  }
});

router.get("/similar/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const currentProduct = await Product.findById(productId);

    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      category: currentProduct.category,
      _id: { $ne: productId },
    }).limit(5);

    res.json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching similar products", error });
  }
});

module.exports = router;
