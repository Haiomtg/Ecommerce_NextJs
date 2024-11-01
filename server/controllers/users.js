import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/User.js'; // Assuming you have a users model
import { getConnection } from "../database/db.js";


// Register route
export const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User(username, hashedPassword, email);
        try {
            const db = await getConnection();
            const [result] = await db.execute("INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)", [newUser.username, newUser.password, newUser.email]);
            return res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
            
        } catch (error) {
            console.error("Error registering user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

// Login route
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
        console.log("Request Body:", req.body);
        try {
            const db = await getConnection();
            const [dbUsers] = await db.execute("SELECT * FROM users");
            
            const user = dbUsers.find(u => {
                return u.Username === username; // Only check username first
            });
            console.log("Found User:", user);
            
            if (!user) {
                return res.status(400).json({ message: "User not found!" });
            }
            
            // If passwords are stored as plain text
            if (user.Password === password) {
                // Generate a token (you should use a secret key from your environment variables)
                const token = jwt.sign({ username: user.Username }, "your_jwt_secret");
                return res.json({ message: "Login successful!", token });
            }

            // If passwords are hashed, use bcrypt to compare
            const isValidPassword = await bcrypt.compare(password, user.Password);
            console.log("Password Validity:", isValidPassword); // Log the result of the password comparison
            
            if (!isValidPassword) {
                return res.status(400).json({ message: "Invalid password!" });
            }
            
            // Generate a token (you should use a secret key from your environment variables)
            const token = jwt.sign({ username: user.Username }, "your_jwt_secret");
            console.log("Token:", token);
            
            return res.json({ message: "Login successful!", token, username: user.Username });
        } catch (error) {
            console.error("Error during login:", error);
            if (!res.headersSent) {
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    };