const { handleChangeUserStatus, handleGetAllUsers } = require("../services/adminService");

async function getAllUsers(req, res, next) {
    try {
        const data = await handleGetAllUsers();
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        next(err);
    }
}

async function changeUserStatus(req, res, next) {
    try {
        const { id } = req.params;

        const data = await handleChangeUserStatus(id);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        if (err.message === "User not found") {
            err.status = 404;
        }
        next(err);
    }
}

module.exports = {
    getAllUsers,
    changeUserStatus
};
