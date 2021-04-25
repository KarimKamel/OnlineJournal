const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  // username: { type: String, unique: true },
  username: String,
  password: String,
  googleId: String,
});
const User = mongoose.model("User", userSchema);

module.exports = User;
