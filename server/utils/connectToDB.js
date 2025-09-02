import pg from "pg";
import env from "dotenv";

env.config();

const requiredEnvVars = [
  "DB_USER",
  "DB_HOST",
  "DB_NAME",
  "DB_PASSWORD",
  "DB_PORT",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.log(`missing required env variable : ${varName}`);
    process.exit(1);
  }
});

const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  }
});

db.connect()
  .then(() => console.log("connected with the database"))
  .catch((err) => {
    console.log("Couldn't connect with the database ", err);
    process.exit(1);
  });

db.on("error", (err) => {
  console.log("Database error: ", err);
  process.exit(1);
});

export const query = (text, params) => db.query(text, params);