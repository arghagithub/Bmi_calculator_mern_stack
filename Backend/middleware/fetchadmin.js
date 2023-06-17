const jwt = require("jsonwebtoken");
const JWTSecret = "~!@#$%&*()_+";
const fetchadmin=(req,res,next)=>{
    const token=req.header('auth-admintoken');
    if(!token){
        return res.json({message:'please authenticate with a valid token'});
    }
    else{
        try {
            const data=jwt.verify(token,JWTSecret);
            req.admin=data.admin;
            next();
        } catch (error) {
            console.log(error.message);
        }
    }
} 
module.exports=fetchadmin;  