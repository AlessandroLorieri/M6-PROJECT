const mongoose = require("mongoose")

const Author = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        select: false
    },
    dob:{
        type:Date,
        required: false,
        default: Date.now
    },
    avatar:{
        type: String,
        required: false,
        default:"https://picsum.photos/200"
    }
},{timestamps: true, strict: true})

module.exports = mongoose.model("author",Author,"authors")