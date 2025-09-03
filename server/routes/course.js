import express from "express";
import jwt from "jsonwebtoken";
import { query } from "../utils/connectToDB.js";
import { getCourseByStudentIdQuery } from "../utils/sqlQuery.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const studentId = decoded.id;

    const result = await query(getCourseByStudentIdQuery, [studentId]);

    res.json(result.rows);
  } catch (err) {
    console.error("Course fetch error: ", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
