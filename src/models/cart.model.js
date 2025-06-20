const pool = require('../config/db');

const addCart = async (user_id) => {
    const query = `INSERT INTO cart(user_id) 
    VALUES($1) RETURNING *`;
    const value = [user_id];
    const execute = await pool.query(query, value);
    return execute.rows[0];
}

const getUserCart = async (user_id) => {
    const query = `SELECT * FROM cart WHERE user_id = $1`;
    const value = [user_id];
    const execute = await pool.query(query, value);
    return execute.rows;
}

module.exports = {
    addCart,
    getUserCart,
}