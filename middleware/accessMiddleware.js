const { UserModel } = require('../model/userModel');

// const access = async(req,res,next)=>{
//     try {
//         const user = await UserModel.findById(req.user.id)
//         if(!user.isAdmin){
//             return res.status(403).json({ message: 'Unauthorized: You are not an admin.' });
//         }
//         next();
//     } catch (error) {
//         res.send({"error":error})
//     }
// }

// module.exports={
//     access
// }
const access = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); 
    } else {
        res.status(403).json({ msg: "You have no access" }); 
    }
};
  module.exports={access}