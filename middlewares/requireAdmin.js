function requireAdmin(req, res, next) {
    const role = req.role;
    if (role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Access forbidden: Admins only" });
    }
}

module.exports = { requireAdmin };