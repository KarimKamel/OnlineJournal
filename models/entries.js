const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  title: String,
  data: String,
  date: Date,
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Entry = new mongoose.model("Entry", entrySchema);

module.exports = Entry;
