import express from "express";
import pool from "../utils/connectToDB.js";
import jwt from "jsonwebtoken";
import { getCourseByStudentIdQuery } from "../utils/sqlQuery.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const studentId = decoded.student_id;

    const { rows } = await pool.query(getCourseByStudentIdQuery, [studentId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
