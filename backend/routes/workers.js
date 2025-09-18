const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

// Create a new worker
router.post('/accept', async (req, res) => {
    console.log(req.body)
    const worker = new Worker(req.body);
    await worker.save();
    console.log(worker)
    res.status(201).json(worker);
});

router.post('/register', async(req ,res)=>{
    console.log(req.body)
    const worker = new Worker(req.body);
    await worker.save();
    res.status(201).json(worker)
})

// Get all workers
router.get('/', async (req, res) => {
    const workers = await Worker.find();
    res.json(workers);
});

module.exports = router;
