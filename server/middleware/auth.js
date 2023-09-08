import Jwt from "jsonwebtoken";

const verifyToken = async(req, res, next) => {
    try{
        let token = req.headers("Authorization");
        if(!token){
            return res.status(401).json({msg: "You are not authorized"});
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = await Jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export { verifyToken };