import express from "express";
import {
  getAllUser,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUser);

router.get("/:id", getUserById)

router.get("/:email", getUserByEmail);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

export default router;
