import User from '../models/User.js';

const getUser = async (req, res) => {
    try{
        const id= req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(err){
        res.status(500).json({error: err.message});
    }
}


const getFriends = async (req, res) => {
    try{
        const id= req.params.id;
        const user = await User.findById(id);
        const friends = user.friends;
        res.status(200).json(friends);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const AddDeleteFriend = async (req, res) => {
    try{
        const id= req.params.id;
        const friendId = req.params.friendId;
        const user = User.findById(id);
        const friend = User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((friend) => friend !== friendId);
            friend.friends = friend.friends.filter((friend) => friend !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const userUpdatedfriends = await User.findByIdAndUpdate(id, {friends: user.friends}, {new: true});
        const friendUpdatedfriends = await User.findByIdAndUpdate(friendId, {friends: friend.friends}, {new: true});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export { getUser, getFriends, AddDeleteFriend };