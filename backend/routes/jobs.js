const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// POST job
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Worker applies
router.post("/:id/apply", async (req, res) => {
  const { workerName, workerId } = req.body;
  const job = await Job.findById(req.params.id);
  job.applicants.push({ workerName, workerId, status: "applied" });
  await job.save();
  res.json(job);
});

// Worker accepts or rejects
router.post('/', async (req, res) => {
  try {
    const request = new Request({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      location: req.body.location,
      date: req.body.date,
      hireeId: req.body.hireeId,    // must be a valid MongoDB ObjectId
      hireeName: req.body.hireeName // if you also send it
    });

    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
