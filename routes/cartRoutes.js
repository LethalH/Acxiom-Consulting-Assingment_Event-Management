const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/add", verifyToken, (req, res) => {

    const { product_id, quantity } = req.body;

    db.query(
        "SELECT * FROM cart WHERE user_id=? AND product_id=?",
        [req.user.id, product_id],
        (err, result) => {

            if (result.length > 0) {
                db.query(
                    "UPDATE cart SET quantity=quantity+? WHERE user_id=? AND product_id=?",
                    [quantity, req.user.id, product_id]
                );
                res.json({ message: "Cart updated" });
            } else {
                db.query(
                    "INSERT INTO cart (user_id,product_id,quantity) VALUES (?,?,?)",
                    [req.user.id, product_id, quantity]
                );
                res.json({ message: "Added to cart" });
            }
        }
    );
});

router.get("/", verifyToken, (req, res) => {
    db.query(
        `SELECT cart.*,products.name 
         FROM cart JOIN products 
         ON cart.product_id=products.id 
         WHERE cart.user_id=?`,
        [req.user.id],
        (err, result) => res.json(result)
    );
});

module.exports = router;
