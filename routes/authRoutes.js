const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Register
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password }); // TODO: hash password
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
    if (!user || user.password !== password) {
      return res.render("login", { error: "Invalid email or password." });
    }

    // For now just redirect (later add JWT / session)
    res.redirect("/analyze");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Login failed." });
  }
});

module.exports = router;
