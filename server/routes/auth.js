require("dotenv").config();

const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const verifyToken = require("../middleware/auth");

// Check if user is logged in => access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error !!" });
  }
});

// Register user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //Simple validation
  if (!username)
    return res
      .status(400)
      .json({ success: false, message: "Please type username" });
  else if (!password)
    return res
      .status(400)
      .json({ success: false, message: "Please type password" });

  try {
    // Check xem username đó đã tồn tại chưa
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    // Success
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error !!" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username)
    return res
      .status(400)
      .json({ success: false, message: "Please type username" });
  else if (!password)
    return res
      .status(400)
      .json({ success: false, message: "Please type password" });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // Username found
    const passWordValid = await argon2.verify(user.password, password);
    if (!passWordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // Login successfully => Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!" });
  }
});

module.exports = router;
