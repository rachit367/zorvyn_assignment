function requireAnalystOrAdmin(req, res, next) {
    const role = req.role;
    if (role === 'admin' || role === 'analyst') {
        next();
    } else {
        return res.status(403).json({ message: "Access forbidden: Elevated roles only" });
    }
}

module.exports = { requireAnalystOrAdmin };
