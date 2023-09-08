import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true, min: 3, max: 20 },
    lastname: { type: String, required: true, min: 3, max: 20 },
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    picturepath : { type: String, default: "" },
    friends: { type: Array, default: [] },
    location: { type: String, default: "" },
    occupation: { type: String, default: "" },
    viewdProfile: Number,
    impressions: Number,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;

