import { query } from "../utils/connectToDB.js";
import {
  getAllUserQuery,
  getUserByIdQuery,
  getUserByEmailQuery,
} from "../utils/sqlQuery.js";

export async function getAllUser(req, res, next) {
  try {
    const response = await query(`
        SELECT to_regclass('users');
        `);
    console.log(response);
    const { rows } = await query(getAllUserQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
  }
}

export async function getUserById(req, res, next) {
  try {
    const { id } = req.params;

    const response = await query(getUserByIdQuery, [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}

export async function findUserByEmail(email) {
  const response = await query(getUserByEmailQuery, [email]);
  return response.rows[0];
}

export async function getUserByEmail(req, res, next) {
  try {
    const { email } = req.params;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createUser(req, res, next) {}

export async function deleteUser(req, res, next) {}

export async function updateUser(req, res, next) {}
