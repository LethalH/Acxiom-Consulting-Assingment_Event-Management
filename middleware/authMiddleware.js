const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token required" });

    jwt.verify(token, "secretkey", (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = decoded;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role)
            return res.status(403).json({ message: "Access denied" });
        next();
    };
}

module.exports = { verifyToken, authorizeRole };
