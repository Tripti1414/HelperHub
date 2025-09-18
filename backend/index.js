const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());

const cookieParser = require('cookie-parser');

app.use(cookieParser());

// ROUTES
const requestRoutes = require('./routes/requests');
const workerRoutes = require('./routes/workers');
const db = require("./config/db")
const userRoutes = require('./routes/user.routes');
const contactRoutes = require('./routes/contactroutes');



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/applications', require('./routes/applications'));
app.use('/api/contact', contactRoutes);




app.post('/api/apply', async (req, res) => {
  try {
    const { jobId, workerId, workerName } = req.body;

    const job = await JobRequest.findById(jobId);
    if (!job) return res.status(404).send("Job not found");

    // Add the worker to the job's applications
    job.appliedWorkers.push({ workerId, workerName });
    await job.save();

    res.status(200).json({ message: 'Applied successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));