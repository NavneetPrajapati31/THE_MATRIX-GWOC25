require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = require("../models/Users");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const otpHolder = {};

const temp = import.meta.env.VITE_BACKEND_URL;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post("/send-otp-email", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log(otp);

    otpHolder[email] = otp;

    const mailOptions = {
      from: "Kashvi Sarees <" + process.env.OWNER_EMAIL + ">",
      to: email,
      subject: "OTP for Registration",
      html: `<p>Your OTP for registration is: <strong>${otp}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully!", success: true });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP", success: false });
  }
});

// **VERIFY OTP API**
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (parseInt(otp) === otpHolder[email]) {
    delete otpHolder[email];
    res
      .status(200)
      .json({ message: "OTP verified successfully!", success: true });
  } else {
    res.status(400).json({ message: "Invalid OTP", success: false });
  }
});

// **REGISTER API**
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "User registered successfully!",
      user: newUser,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed!",
      error: err.message,
      success: false,
    });
  }
});

// **LOGIN API**
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ message: "User doesn't exist!", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials!", success: false });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/add-address", async (req, res) => {
  const { userId, street, city, state, pincode, country, name } = req.body;
  if (!userId || !name || !street || !city || !state || !pincode) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.addresses.push({ street, city, state, pincode, country, name });

    await user.save();

    res.json({ message: "Address added successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });

    console.log(error);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/google-login", async (req, res) => {
  const { email, name, googleId, picture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        googleId,
        profilePicture: picture,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Google authentication failed!" });
  }
});

// Route to send password reset email
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, "SECRET_KEY", {
      expiresIn: "15m",
    });

    // Email content
    const mailOptions = {
      from: "Kashvi Sarees <" + process.env.OWNER_EMAIL + ">",
      to: email,
      subject: "Password Reset",
      html: `<p>Click the link below to reset your password:</p>
               <a href="${temp}/reset-password/${resetToken}">Reset Password</a>
               <p>This link expires in 15 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset email sent!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
