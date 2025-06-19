const pool = require("../config/db");
const bcrypt = require("bcrypt");

const createUser = async ({ firstname, lastname, email, role = 'customer', password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (firstname, lastname, email, password, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, firstname, lastname, email, role;
  `;
  const values = [firstname, lastname, email, hashedPassword, role];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT id, firstname, lastname, email, role FROM users");
  return result.rows;
};


const updateUser = async (id, { email, password }) => {
  const result = await pool.query(
    "UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING id, email",
    [email, password, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

const getUserProfile = async (id) => {
  const result = await pool.query("SELECT id, firstname, lastname, email, role FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const value = [id];
  const { rows } = await pool.query(query, value);
  return rows[0];
}


module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserProfile,
  findUserById
};
