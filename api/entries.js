const express = require("express");
const router = express.Router();
const Entry = require("../models/entries");
const User = require("../models/User");
const dateFormat = require("dateformat");

router.get("/date/:date/username/:username", async (req, res) => {
  console.log("get entries by username and date");
  const { date, username } = req.params;
  try {
    // const user = await User.findOne({ username });
    // const userId = user._id;
    // console.log(userId);
    const currentDate = new Date(date).setHours(0, 0, 0, 0);
    const dayInMS = 1000 * 60 * 60 * 24;
    const nextDayDate = currentDate + dayInMS;

    console.log("current date " + dateFormat(currentDate));
    console.log("next day date " + dateFormat(nextDayDate));

    const user = await User.findOne({ username });

    const entries = await Entry.find({
      date: { $gte: currentDate, $lt: nextDayDate },
      userId: user._id,
    });
    console.log(entries);
    res.json(entries);
  } catch (err) {
    console.log(err);
  }
});
router.get("/", async (req, res) => {
  console.log("get entries by username and date");
  const { date, username } = req.query;
  try {
    const currentDate = new Date(date).setHours(0, 0, 0, 0);
    const dayInMS = 1000 * 60 * 60 * 24;
    const nextDayDate = currentDate + dayInMS;

    console.log("current date " + dateFormat(currentDate));
    console.log("next day date " + dateFormat(nextDayDate));

    const user = await User.findOne({ username });

    const entries = await Entry.find({
      date: { $gte: currentDate, $lt: nextDayDate },
      userId: user._id,
    });
    console.log(entries);
    res.json(entries);
  } catch (err) {
    console.log(err);
  }
});
router.post("/", async (req, res) => {
  console.log("in post entry");
  const { date, data, username, title } = req.body.data;
  console.log("entry Data: " + req.body);
  const user = await User.findOne({ username });
  console.log(user);
  const newEntry = new Entry({ date, data, userId: user._id, title });
  newEntry.save((err, doc) => {
    if (err) return console.log(err);
    else res.send(doc);
  });
});

router.get("/:_id", async (req, res) => {
  console.log("get entry by id");
  const { _id } = req.params;
  try {
    const entry = await Entry.findOne({ _id });
    console.log(entry);
    res.json(entry);
  } catch (err) {
    console.log(err);
  }

  // Entry.findOne({});
});

router.put("/:_id", (req, res) => {
  console.log("router put");

  const { data } = req.body;
  console.log(_id, data);
  Entry.findOneAndUpdate({ _id }, { data }, { new: true }, (err, entry) => {
    if (err) return console.log(err);
    else {
      console.log("entry " + entry);
      return res.send(entry);
    }
  });
});
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Entry.deleteOne({ _id }, (err) => {
    if (err) return res.send(err.message);
    else return res.send(_id);
  });
});

module.exports = router;
