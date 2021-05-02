const mongoose = require('mongoose');
const Stdschema = new mongoose.Schema({
    name:String
})
const Student = mongoose.model("students", Stdschema);
module.exports = Student;