import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
    const { firstname, lastname, username, email,password,picturepath,friends,location,occupation } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ firstname, lastname, username, email, password: hashedPassword,picturepath,friends,location,occupation,viewdProfile: 0,impressions: 0 });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const userLogged = await User.findOne({ email: email });
        if(!userLogged){
            return res.status(404).json({msg: "Email or password incorrect"});
        }
        const validPassword = await bcrypt.compare(password, userLogged.password);
        if(!validPassword){
            return res.status(404).json({msg: "Email or password incorrect"});
        }
        const token = jwt.sign({ id: userLogged._id }, process.env.JWT_SECRET, { expiresIn: "5d" });
        delete userLogged.password;
        res.status(200).json({ userLogged, token });
    } catch(err){
        res.status(500).json(err);
    }
};

export { register ,login};