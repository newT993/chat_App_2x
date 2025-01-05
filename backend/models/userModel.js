import mongoose, { model, Schema } from "mongoose";
const UserS = new Schema({
    fullname:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    profilePic: {
        type: String,
        default: ''
    }   
},{
    timestamps: true
})

const User = model("User", UserS)

export default User;