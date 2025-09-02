import express from "express";
import cors from"cors";
import dotenv from "dotenv";
import userRouter from "./routers/user.js";
import authRouter from "./routers/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: ["http://localhost:5173", "https:krisanawork.github.io"]
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/user", authRouter);

app.use((err, req, res, next) => {
  const statusCode =err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({error: message});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});