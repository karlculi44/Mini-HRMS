import express from "express";
import db from "../db.js";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // check user
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: users[0].id,
        email: users[0].email,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

export default router;
