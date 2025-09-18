const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  date: Date,
hireeId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",   // or Hiree if you have such a model
  required: true
},
hireeName: String ,  // optional, store display name separately

  applicants: [
    {
      workerName: String,
      workerId: String,
      status: { type: String, default: "applied" } // applied, accepted, rejected
    }
  ],
});

module.exports = mongoose.model("Job", jobSchema);
