const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true 
    },
    roomtype:{
        type: String,
        required: true 
    },
    person:{
        type: Number,
        required: true 
    }
})

mongoose.model('ReqData',postSchema)