const mongoose  = require("mongoose")
const bcryptjs = require('bcryptjs')

let commentsSchema = new mongoose.Schema({
    name: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"] 
    },
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    mobile : {
        type: String, 
        required: [true, "can't be blank"],
        minLength : [10 , "Mobile no must be 10 digit exact"],
        maxlength: [10 , "Mobile no must be 10 digit exact"] 
    },
    comment:{
        type: String,
        required: [true, "can't be blank"]
    },
    status: {
        type: String,
        default: "open"
    }
})
   
let commentsModel =  mongoose.model("comments", commentsSchema)
module.exports = commentsModel;