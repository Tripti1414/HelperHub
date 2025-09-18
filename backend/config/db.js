const mongoose = require('mongoose');
const db = mongoose.connect("mongodb://localhost/mydatabase").then(()=>console.log("connected successfully")).catch((err)=>console.log("connection failed : " + err));
module.exports = db;
