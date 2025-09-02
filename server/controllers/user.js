import { query } from "../utils/connectToDB.js";
import { getAllUserQuery, getUserQuery } from "../utils/sqlQuery.js";

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

export async function getUser(req, res, next) {
  try {
    const { id } = req.params;

    const response = await query(getUserQuery, [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
}

export async function createUser(req, res, next) {}

export async function deleteUser(req, res, next) {}

export async function updateUser(req, res, next) {}
