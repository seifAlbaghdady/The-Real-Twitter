import Post from '../models/Post.js'
import User from '../models/User.js'

const createPost = async (req, res) => {
    try{
        const {UserId, description, picturePath} = req.body;
        const user = await User.findById(UserId);
        const newPost = new Post({
            UserId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            UserPicturePath: user.picturePath,
            likes: {},
            Comments: []
        });
        await newPost.save();
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const getPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const getUserPosts = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        const posts = await Post.find({UserId: id});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const AddDeleteLike = async (req, res) => {
    try{
        const postId = req.params.id;
        const userId = req.body.userId;

        const post = await Post.findById(postId);
        const isLiked = post.likes[userId];
        if(isLiked){
            delete post.likes[userId];
        }else{
            post.likes[userId] = true;
        }
        await post.save();

        // TODO: send back the updated post
        const updatedPost = await Post.findByIdAndUpdate(postId, {likes: post.likes}, {new: true});
        res.status(200).json(updatedPost);
    } catch(err){
        res.status(500).json({error: err.message});
    }
}
export {createPost, getPosts, getUserPosts, AddDeleteLike}