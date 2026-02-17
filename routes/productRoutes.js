const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken, authorizeRole } = require("../middleware/authMiddleware");

router.post("/add", verifyToken, authorizeRole("VENDOR"), (req, res) => {

    const { name, description, price, quantity } = req.body;

    db.query(
        "INSERT INTO products (vendor_id,name,description,price,quantity) VALUES (?,?,?,?,?)",
        [req.user.id, name, description, price, quantity],
        () => res.json({ message: "Product added" })
    );
});

router.get("/all", (req, res) => {
    db.query("SELECT * FROM products WHERE status=TRUE", (err, result) => {
        res.json(result);
    });
});

router.get("/vendor-products",
    verifyToken,
    authorizeRole("VENDOR"),
    (req, res) => {
        db.query(
            "SELECT * FROM products WHERE vendor_id=?",
            [req.user.id],
            (err, result) => res.json(result)
        );
    }
);

module.exports = router;
