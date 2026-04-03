const userModel = require("../models/userModel");

async function handleGetAllUsers() {
    const users = await userModel.find().select("-password");
    return users;
}

async function handleChangeUserStatus(userId) {
    const user = await userModel.findById(userId)
    .select('-password');
    if (!user) {
        throw new Error("User not found");
    }
    user.isActive = !user.isActive;
    await user.save();
    return user;
}

module.exports = {
    handleGetAllUsers,
    handleChangeUserStatus
};
