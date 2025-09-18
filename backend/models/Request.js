const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    category: String,
    description: String,
    address: String,
    time: String,
    date: String,
    location: String,

    hireeId:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
    name: { type: String, required: true },

    status: { type: String, default: 'pending' },
    applicants: [{ workerId: String, name: String }],
    selectedWorker: {
        workerId: String,
        status: { type: String, enum: ['accepted', 'rejected', 'pending'], default: 'pending' }
    }
  }, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
