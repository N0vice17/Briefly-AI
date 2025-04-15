const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/:from/:to", async (req, res) => {
  const { from, to } = req.params;
  const messages = await Message.find({
    $or: [
      { from, to },
      { from: to, to: from }
    ]
  }).sort({ timestamp: 1 });
  res.json(messages);
});

module.exports = router;
