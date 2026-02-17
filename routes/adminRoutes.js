const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

router.get("/users",
    verifyToken,
    authorizeRole("ADMIN"),
    (req, res) => {
        db.query("SELECT id,name,email,role,status FROM users",
            (err, result) => res.json(result));
    }
);

router.put("/toggle-user/:id",
    verifyToken,
    authorizeRole("ADMIN"),
    (req, res) => {
        db.query(
            "UPDATE users SET status=NOT status WHERE id=?",
            [req.params.id],
            () => res.json({ message: "Status changed" })
        );
    }
);

module.exports = router;
