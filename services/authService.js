const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

async function handleRegister(name, email, password, role) {
    const existingUser = await userModel.findOne({ email: email });
    
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: role || 'viewer'
    });

    return {
        user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    };
}

async function handleLogin(email, password) {
    const user = await userModel.findOne({ email: email });
    
    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
        throw new Error("Account is inactive");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = await generateToken(user._id, user.role);

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token: token
    };
}

module.exports = {
    handleRegister,
    handleLogin
};
