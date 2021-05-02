const express = require("express");
const router = express.Router();
const Entry = require("../models/entries");
const User = require("../models/User");
const dateFormat = require("dateformat");

function isValidDate(date) {
  return date.getTime() === date.getTime();
}

// router.get("/date/:date/username/:username", async (req, res) => {
//   console.log("get entries by username and date");
//   const { date, username } = req.params;
//   try {
//     const user = await User.findOne({ username });
//     const currentDate = new Date(date);

//     if (isValidDate(currentDate)) {
//       currentDate.setHours(0, 0, 0, 0);
//       const dayInMS = 1000 * 60 * 60 * 24;
//       const nextDayDate = currentDate + dayInMS;
//       console.log("current date " + dateFormat(currentDate));
//       console.log("next day date " + dateFormat(nextDayDate));
//       console.log("current date no format" + currentDate);
//       console.log("next day date no format" + nextDayDate);

//       const entries = await Entry.find({
//         date: { $gte: currentDate, $lt: nextDayDate },
//         userId: user._id,
//       });
//       console.log(entries);
//       res.json(entries);
//     } else {
//       const entries = await Entry.find({
//         userId: user._id,
//       });
//       console.log(entries);
//       res.json(entries);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/count", async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ username });
  const entriesCount = await Entry.find({
    userId: user._id,
  }).count();
  res.json(entriesCount);
});
router.get("/", async (req, res) => {
  console.log("get entries by username and date");
  const { date, username, amount, order } = req.query;
  console.log("get entry date:", date);
  const firstEntry = amount * (order - 1);
  const lastEntry = amount * order;

  try {
    const user = await User.findOne({ username });
    const minDate = new Date(date);
    minDate.setHours(0, 0, 0, 0);

    if (isValidDate(minDate)) {
      const maxDate = new Date();
      maxDate.setDate(minDate.getDate() + 1);

      console.log("current date " + minDate);
      console.log("next day  date " + maxDate);

      const user = await User.findOne({ username });

      const entries = await Entry.find({
        date: { $gte: minDate, $lt: maxDate },
        userId: user._id,
      });
      res.json(entries);
    } else {
      const entries = await Entry.find({
        userId: user._id,
      });
      // console.log(entries);
      console.log("first entry:" + firstEntry);
      console.log("last entry:" + lastEntry);

      console.log(entries.slice(firstEntry, lastEntry));
      res.json(entries.slice(firstEntry, lastEntry));
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/", async (req, res) => {
  console.log("in post entry");
  const {
    date,
    data,
    username,
    title,
    createdAt,
    timezoneOffset,
  } = req.body.data;
  console.log("received date in save entry:", date);
  const serverTimezoneOffset = new Date().getTimezoneOffset();
  console.log(
    "timezone offeset difference:" + (timezoneOffset - serverTimezoneOffset)
  );
  const user = await User.findOne({ username });
  console.log(user);
  const newEntry = new Entry({
    date,
    data,
    userId: user._id,
    title,
    createdAt,
  });
  newEntry.save((err, doc) => {
    if (err) return console.log(err);
    else {
      console.log("date saved as ", doc.date);
      res.send(doc);
    }
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
