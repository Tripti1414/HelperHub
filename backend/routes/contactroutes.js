const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();
console.log("✅ contactRoutes loaded");

// POST: save new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ success: true, msg: "Message saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// (optional) GET: for admin to view all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

module.exports = router;
