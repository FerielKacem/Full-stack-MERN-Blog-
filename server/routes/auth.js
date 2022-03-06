 const router = require("express").Router();
const { compare } = require("bcrypt");
 const User = require ('../models/Users');
 const bcrypt = require('bcrypt');
 //REGISTER 

router.post("/register", async (req , res) =>{
try {
    const salt =  await bcrypt.genSalt(10);
const hasedPass = await bcrypt.hash(req.body.password, salt);
 const newUser = new User({
     username : req.body.username,
     email : req.body.email,
     password :hasedPass,
 })

 const user = await newUser.save();
 res.status(200).json(user)
}catch (err){
res.status(500).json(err);
}
})
// LOGIN
router.post("/login",async  (req , res)=>{
    try{
     const loginUser = await User.findOne({username : req.body.username});
 
     if (!loginUser) {
        return res.status(400).json({
          status: 'error',
          error: 'wrong credentials username !',
        });
      }
    const validation = await bcrypt.compare(req.body.password , loginUser.password);
    if ( !validation ) {
        return res.status(400).json({
          status: 'error',
          error: 'wrong credentials  password !',
        });
      }
    
     const {password , ...others}= loginUser._doc;
     return  res.status(200).json(loginUser);
    }catch(err){
        return  res.status(500).json(err);
    }




})






module.exports = router;
  
