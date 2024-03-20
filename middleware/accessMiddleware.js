const { UserModel } = require('../model/userModel');


const access = (req, res, next) => {
    if (req.user.isAdmin) {
        console.log(req.user.isAdmin)
        next(); 
    } else {
        res.status(403).send({ msg: "You have no access" }); 
    }
};
  module.exports={access}