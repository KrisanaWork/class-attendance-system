export const getAllUserQuery = `SELECT * FROM users`;

export const getUserByIdQuery = `SELECT * FROM users WHERE id = $1`;

export const getUserByEmailQuery = `SELECT * FROM users WHERE email = $1`;
