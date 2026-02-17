# Technical-Event-Management_Acxiom-Consulting
Hi 👋

This is a simple full-stack web application that I built as part of a
technical assignment.

The project is a role-based system where:

-   Users can browse products and place orders\
-   Vendors can add and manage their products\
-   Admin can manage users and control the system

The main purpose of this project is to demonstrate my understanding of
backend development, authentication, and database structure.

------------------------------------------------------------------------

## 🛠 Technologies Used

Frontend: - HTML - Bootstrap - JavaScript (Fetch API)

Backend: - Node.js - Express.js - MySQL - JWT (Authentication) - Bcrypt
(Password Hashing)

------------------------------------------------------------------------

## 📌 Features

### 👤 User

-   Signup and Login
-   View available products
-   Add products to cart
-   Checkout and place order

### 🏪 Vendor

-   Login
-   Add new products
-   View their own products

### 🛡 Admin

-   View all users
-   Activate / Deactivate users

------------------------------------------------------------------------

## 🔐 Security

-   Passwords are hashed using bcrypt
-   JWT is used for authentication
-   Routes are protected based on user roles

------------------------------------------------------------------------

## 🗄 Database Tables

The application uses the following main tables:

-   users\
-   products\
-   cart\
-   orders\
-   order_items

All tables are connected using proper foreign key relationships.

------------------------------------------------------------------------

## ▶️ How to Run the Project

1.  Install dependencies:

npm install

2.  Create MySQL database:

CREATE DATABASE event_management;

3.  Update database credentials inside:

config/db.js

4.  Start the server:

node server.js

Server runs on:

http://localhost:5000

Open in browser:

/login.html

------------------------------------------------------------------------

## 👨‍💻 About This Project

This project helped me understand:

-   How authentication works
-   How role-based systems are implemented
-   How frontend and backend communicate
-   How to design relational databases properly

The project is built in a simple and clean way with focus on
functionality and structure.

------------------------------------------------------------------------

Developed by\
Harsh Verma
