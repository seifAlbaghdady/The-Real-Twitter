import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    description: { type: String, max: 500 },
    picturePath: { type: String, default: "" },
    likes: { type: Map, of: Boolean, default: {} },
    Comments : { type: Array, default: [] },
    location: { type: String, default: "" },
    firstName : { type: String, default: "" },
    lastName : { type: String, default: "" },
    UserPicturePath : { type: String, default: "" },
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

export default Post;