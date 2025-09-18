const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

console.log("sdflkj")
// Create a job request
router.post('/', async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    console.log("Request created:", request);
    res.status(201).json(request);
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// Get all requests
// GET /api/requests
// Get all requests (or filter by hireeId)
router.get("/", async (req, res) => {
  
  try {
    const { hireeId } = req.query;
    let requests;

        if (hireeId) {
      // cast hireeId to string just in case
     requests = await Request.find({ hireeId: hireeId.toString() });
      return res.json(requests);
    }
    else{
        requests=await Request.find();
    }

    // fallback (for admin/testing) → return all
    // const requests = await Request.find();


    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Worker applies to a request
// Worker applies to a request
router.post('/:id/apply', async (req, res) => {
  try {
    const { workerId, name } = req.body;   // destructure properly
    const id = req.params.id;

    if (!workerId || !name) {
      return res.status(400).json({ error: "workerId and name are required" });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { $push: { applicants: { workerId, name } } }, // save both workerId + name
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json(updatedRequest);
  } catch (err) {
    console.error("Error applying to request:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a request by ID
router.delete('/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const deleted = await Request.findByIdAndDelete(requestId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Hiree updates status
router.put('/:id/status', async (req, res) => {
    const { workerId, name, status } = req.body;
    const request = await Request.findById(req.params.id);
    request.selectedWorker = { workerId, name, status };
    request.status = status;
    await request.save();
    res.json(request);
});


module.exports = router;
