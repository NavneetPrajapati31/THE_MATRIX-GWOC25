const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Products"); // Assuming you have a Product model
const router = express.Router();

// Route to fetch paginated products (with optional category filter)
router.get("/getProducts", async (req, res) => {
  try {
    let { page = 1, limit = 5, category } = req.query; // Default: page 1, limit 5
    page = parseInt(page);
    limit = parseInt(limit);

    let filter = {};
    if (category) {
      filter.category = category; // Filter products by category if provided
    }

    const products = await Product.find(filter)
      .skip((page - 1) * limit) // Skip previous pages
      .limit(limit); // Get only the required products

    const totalProducts = await Product.countDocuments(filter); // Total products in DB (filtered)

    console.log(totalProducts);

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

module.exports = router;
