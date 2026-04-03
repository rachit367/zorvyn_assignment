const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

async function seedUsers() {
    try {
        const defaultPassword = "123456";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultPassword, salt);

        const adminExists = await userModel.findOne({ email: "admin@test.com" });
        if (!adminExists) {
            await userModel.create({
                name: "Admin User",
                email: "admin@test.com",
                password: hashedPassword,
                role: "admin"
            });
            console.log("Seed: Admin created (admin@test.com / 123456)");
        }

        const analystExists = await userModel.findOne({ email: "analyst@test.com" });
        if (!analystExists) {
            await userModel.create({
                name: "Analyst User",
                email: "analyst@test.com",
                password: hashedPassword,
                role: "analyst"
            });
            console.log("Seed: Analyst created (analyst@test.com / 123456)");
        }

        const viewerExists = await userModel.findOne({ email: "viewer@test.com" });
        if (!viewerExists) {
            await userModel.create({
                name: "Viewer User",
                email: "viewer@test.com",
                password: hashedPassword,
                role: "viewer"
            });
            console.log("Seed: Viewer created (viewer@test.com / 123456)");
        }

    } catch (err) {
        console.error("Failed to seed users:", err);
    }
}

module.exports = {
    seedUsers
};
