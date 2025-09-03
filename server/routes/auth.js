import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../utils/connectToDB.js";
import { getEmailQuery } from "../utils/sqlQuery.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await query(getEmailQuery, [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    let token;

    if (user.role === "student") {
      token = jwt.sign(
        { student_id: user.student_id, email: user.email, role: "student" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } else if (user.role === "instructor") {
      token = jwt.sign(
        {
          instructor_id: user.instructor_id,
          email: user.email,
          role: "instructor",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    }

    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    console.error("Login error: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
