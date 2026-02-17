const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/checkout", verifyToken, (req, res) => {

    db.query(
        `SELECT cart.*,products.price 
         FROM cart JOIN products 
         ON cart.product_id=products.id 
         WHERE cart.user_id=?`,
        [req.user.id],
        (err, cartItems) => {

            let total = 0;
            cartItems.forEach(item => {
                total += item.price * item.quantity;
            });

            db.query(
                "INSERT INTO orders (user_id,total_amount) VALUES (?,?)",
                [req.user.id, total],
                (err, orderResult) => {

                    const orderId = orderResult.insertId;

                    cartItems.forEach(item => {
                        db.query(
                            "INSERT INTO order_items (order_id,product_id,quantity,price) VALUES (?,?,?,?)",
                            [orderId, item.product_id, item.quantity, item.price]
                        );
                    });

                    db.query("DELETE FROM cart WHERE user_id=?", [req.user.id]);
                    res.json({ message: "Order placed" });
                }
            );
        }
    );
});

module.exports = router;
