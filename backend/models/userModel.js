import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true,
        minlength: 6
    },
    userType: {
        type: String,
        required: true,
        enum: ["estudiante", "moderador"]
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User