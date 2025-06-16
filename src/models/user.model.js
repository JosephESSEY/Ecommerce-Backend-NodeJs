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

module.exports = {
  createUser,
  findUserByEmail,
};
