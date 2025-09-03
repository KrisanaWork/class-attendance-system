import express from "express";
import jwt from "jsonwebtoken";
import { query } from "../utils/connectToDB.js";
import { getCourseByStudentIdQuery } from "../utils/sqlQuery.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const result = await query(getCourseByStudentIdQuery, [studentId]);

    res.json(result.rows);
  } catch (err) {
    console.error("Course fetch by ID error: ", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
