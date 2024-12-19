const userModel = require("../../DB/user.model") 
const jwt = require('jsonwebtoken');
const becrypt = require('bcrypt');

const {
	StatusCodes,
	getReasonPhrase,
} = require('http-status-codes');

const signUp = async(req,res)=>{
    try {
       let {first_name,last_name,email,password,age} = req.body
       let emailFound = await userModel.findOne({email})
       if (emailFound) {
          res.status(StatusCodes.BAD_REQUEST).json({massage:"email is aready found",statusErr:getReasonPhrase(StatusCodes.BAD_REQUEST)})
       }else{
              let addUser = new userModel({first_name,last_name,email,password,age})
            await addUser.save()
              let token = jwt.sign({id:addUser._id},process.env.JWTKEY,{expiresIn:"2 days"})
              res.status(StatusCodes.ACCEPTED).json({massage:"succes add",token}) 
       }
    } catch (error) {
       res.status(StatusCodes.BAD_GATEWAY).json({massage:error.message,statusErr:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
 
    }
 }

 const signIn = async(req,res)=>{
    try {
       let {email, password}=req.body
       let user = await userModel.findOne({email})
       if(user){
          becrypt.compare(password,user.password,function (err,result){
             if (result) {
                let token = jwt.sign({id:user._id,isLogin:true},process.env.JWTKEY)
    
                res.status(StatusCodes.ACCEPTED).json({massage:"welcome",token})
             }else{
                res.status(StatusCodes.BAD_REQUEST).json({massage:"password is wrong"})
             }
          })
       }else{
          res.status(StatusCodes.BAD_REQUEST).json({massage:"user is not found"})
       }
    } catch (error) {
       res.status(StatusCodes.BAD_GATEWAY).json({massage:"the serverr error",error,statusErr:getReasonPhrase(StatusCodes.BAD_GATEWAY)})
    
    }
    }

    module.exports = {signUp,signIn}