const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  worker : {type: mongoose.Schema.ObjectId , ref:"User"},
  request:{type:mongoose.Types.ObjectId , ref:"Request"},
  category: String,
  status: { type: String, default: 'applied' },
 },  { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
