const jwt=require('jsonwebtoken')
const userModel=require('./../models/userModel')
async function generateToken(user_id,role) {
    const token=jwt.sign({
        user_id,
        role
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'15d'
    })
    return token;
}

module.exports = {generateToken}