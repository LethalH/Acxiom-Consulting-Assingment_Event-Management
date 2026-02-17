const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "event_management"
});

db.connect((err) => {
    if (err) {
        console.log("DB connection failed");
    } else {
        console.log("Database connected");
    }
});

module.exports = db;
