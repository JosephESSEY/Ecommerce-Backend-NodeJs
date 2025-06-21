const pool = require('../config/db');

const addOrder = async (user_id, total) => {
    const query = `INSERT INTO orders(user_id, total)
    VALUES($1, $2) RETURNING *`;
    const values = [user_id, total];
    const result = await pool.query(query, values);
    return result.rows[0];
}

