const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({ username, email, password:hashedPassword}); // TODO: hash password
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("register", { error: "Registration failed, try again." });
  }
});

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) return res.render("login", { error: "Invalid username or password" });
    // For now just redirect (later add JWT / session)

    // ✅ Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Store JWT in cookies
    res.cookie("token", token, { httpOnly: true });
    

    res.redirect("/analyze");

  } catch (err) {
    console.error(err);
    res.render("login", { error: "Login failed." });
  }
});

module.exports = router;
