const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },  // store hashed password
}, { timestamps: true }); // adds createdAt, updatedAt automatically

module.exports = mongoose.model("User", userSchema);
