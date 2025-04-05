const{Router}=require("express");
const User=require("../models/user");
const  {createTokenForuser}=require("../services/authentication");

const router=Router();

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.post("/signup",async(req,res)=>{
    const{fullname,email,password}=req.body;
    await User.create({
        fullname,email,password
    });
    return res.redirect("signin");
})

router.get("/signin",(req,res)=>{
    return res.render("signin");
})

router.post("/signin",async(req,res)=>{
    const{email,password}=req.body;

    if(!email||!password){
        return res.send("no email and password");
    };

    try {
        const user=await User.findOne({email});
        const token= createTokenForuser(user);

        if(!user||user.password!==password){
            return res.send("Invalid email or password");
        }

        res.cookie("token",token);

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.send("Internal Server Error");
    }
    
})

module.exports=router;