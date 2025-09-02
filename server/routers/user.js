import express from "express";
import {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUser);

router.get("/:id", getUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

export default router;