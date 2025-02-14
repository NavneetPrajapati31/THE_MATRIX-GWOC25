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

// **SEND OTP API**
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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

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

    // ✅ Push new address to the array
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

/**
 *    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({ email: "", password: "", name: "", phone: "" });
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            if (token && !user) {
                try {
                    const response = await fetch("http://localhost:3001/auth/user", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        dispatch(setUser(data.user));
                    } else {
                        dispatch(logout());  
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };
        fetchUser();
    }, [token, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuth = async () => {
        setLoading(true);
        setMessage("");

        const url = isRegister ? "http://localhost:3001/auth/register" : "http://localhost:3001/auth/login";
        const body = JSON.stringify(isRegister ? formData : { email: formData.email, password: formData.password });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
            });

            const data = await response.json();
            if (response.ok) {
                dispatch(login({ token: data.token }));
                dispatch(setUser(data.user));
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };
 */

module.exports = router;
