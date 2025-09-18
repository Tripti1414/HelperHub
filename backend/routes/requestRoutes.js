const express = require('express');
const router = express.Router();
const Request = require('./models/request');

// DELETE a request by ID
router.delete('/:id', async (req, res) => {
  try {
    const requestId = req.params.id;

    await Request.findByIdAndDelete(requestId);

    res.json({ success: true, message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
