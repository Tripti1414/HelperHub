    const mongoose = require('mongoose');

    const workerSchema = new mongoose.Schema({
        worker:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
        skills: [String],
        experience: String,
        appliedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
    });

    module.exports = mongoose.model('Worker', workerSchema);
