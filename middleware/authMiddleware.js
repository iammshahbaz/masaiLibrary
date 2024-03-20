const jwt = require("jsonwebtoken");
const {UserModel} = require("../model/userModel")
const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        jwt.verify(token,"masai",async(err,decoded)=>{
            if(decoded){
                const{userID} = decoded;
                const user = await UserModel.findOne({_id: userID})
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.status(403).json({ msg: "You are not authorized" });
                }
            }
            else{
                res.send({msg:"Invalid token"})
            }
        })
    }
    else{
      
        res.send({msg:"Please login"})
      }
}

module.exports={auth}