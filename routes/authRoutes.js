const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";

    db.query(sql, [name, email, hashedPassword, role], (err) => {
        if (err) return res.status(500).json({ message: "User exists" });
        res.json({ message: "Registered successfully" });
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
        if (result.length === 0)
            return res.status(400).json({ message: "User not found" });

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            "secretkey"
        );

        res.json({ token, role: user.role });
    });
});

module.exports = router;
