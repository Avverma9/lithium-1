const User = require("../models/User")

const storeUserDetails = async function(req,res){
    try{
        let data = req.body
 let {email,mobile} = data
 if(!mobile){
    return res.status(400).send({status : false, message: "Please Enter Mobile Number"})
 }
 if(!email){
    return res.status(400).send({status : false, message: "Please Enter Email"})
 }

 const user = await User.create(data)
 return res.status(201).send({ status: true, message: "User created successfully", data: user });
}
catch (error) {
  return res.status(500).send({ status: false, message: error.message });
}
}
  
module.exports.storeUserDetails=storeUserDetails