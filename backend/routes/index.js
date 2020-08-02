const express = require("express");
const User = require("../models/index");
const router = express.Router();

router.get("/", (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, data) => {
    res.json(data);
  });
});

router.post("/", (req, res) => {
  const user = new User({
    date: req.body.date,
    city: req.body.city,
    country: req.body.country,
  });
  user.save(() => {
    res.json(user);
  });
});

module.exports = router;
