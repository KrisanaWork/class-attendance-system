import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import courseRouter from "./routes/course.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: ["http://localhost:5173", "https://krisanawork.github.io"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/courses", courseRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});