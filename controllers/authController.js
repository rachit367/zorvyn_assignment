const { handleRegister, handleLogin } = require("../services/authService");

async function register(req, res, next) {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password) {
            const err = new Error("Name, email and password are required");
            err.status = 400;
            return next(err);
        }

        const data = await handleRegister(name, email, password, role);

        res.status(201).json({
            success: true,
            data: data
        });
    } catch (err) {
        if (err.message === "Email already exists") {
            err.status = 400;
        }
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const err = new Error("Email and password are required");
            err.status = 400;
            return next(err);
        }

        const data = await handleLogin(email, password);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        if (err.message === "Invalid email or password" || err.message === "Account is inactive") {
            err.status = 401;
        }
        next(err);
    }
}

module.exports = {
    register,
    login
};
