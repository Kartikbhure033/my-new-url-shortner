const JWT=require("jsonwebtoken");

const secret="JWT_SECRET";

function createTokenForuser(user){
    const payload={
        _id:user.id,
        fullname:user.fullname,
        email:user.email,
        role:user.role,
    }
    const token=JWT.sign(payload,secret);
    return token;
}

function validatetoken(token){
    const user= JWT.verify(token,secret);
    return user;
}

module.exports={
    createTokenForuser,
    validatetoken
}