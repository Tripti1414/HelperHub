const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Worker = require('../models/Worker');

// Get all applications
router.get('/:id', async (req, res) => {
  const workerId = req.params.id
  const applications = await Application.find({worker:workerId})
  .populate('worker')  // populate worker details
      .populate('request');    // populate job details;
      console.log(applications)
  res.json(applications);
});

router.get("/", async(req , res)=>{
  const application = await Application.find().populate('worker').populate('request')
  res.json(application)
})

// Apply to a job
router.post('/', async (req, res) => {
  try {
    const application = new Application({
      worker: req.body.worker,
      request: req.body.request,
      category: req.body.category,
      status: 'applied',  // default status
    });

    await application.save();

    // Update worker's appliedRequests
    await Worker.findByIdAndUpdate(
      req.body.worker,
      { $push: { appliedRequests: req.body.request } }, 
      { new: true }
    );

    res.json(application);
  } catch (err) {
    console.error("Error applying to job:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update application status (accept/reject)
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  const updated = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
});

module.exports = router;
