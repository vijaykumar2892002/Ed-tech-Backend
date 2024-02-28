const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: string,
        trim: true
    },
    password: {
        type: string,
        required: true
    },
    accountType: {
        type: string,
        enum: ["Admin", "Student", "Instructor"],
        required: true,
    },
    active: {
        type: booleam,
    },
    approve: {
        type: booleam
    },
    image: {
        type: String,
        required: true,
    },
    token :{
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    }]
});
module.exports = mongoose.model("USer", userSchema);
