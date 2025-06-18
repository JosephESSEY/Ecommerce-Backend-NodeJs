const pool = require('../config/db');

exports.createCategorie = async (name, description) => {
    const q = `INSERT INTO categories(name, description) 
    VALUES($1, $2) RETURNING *`;
    const values = [name, description];
    const result = await pool.query(q, values);
    return result.rows[0];
}

exports.updateCategorie = async (id, name, description) => {
    const q = `UPDATE categories
    SET name = $1,
    description = $2
    WHERE id = $3
    RETURNING *`;
    const values = [name, description, id];
    const result = await pool.query(q, values);
    return result.rows[0];
}

exports.deleteCategorie = async (id) => {
    const q = 'DELETE FROM categories WHERE id = $1 RETURNING *';
    const value = [id];
    const result = await pool.query(q,value);
    return result.rows[0];
}

exports.ListeCategorie = async () =>{
    const q = `SELECT * FROM categories`;
    const {rows} = await pool.query(q);
    return rows;
}

exports.getCategorieById = async (id) =>{
    const q = `SELECT * FROM categories WHERE id = $1`;
    const value = [id];
    const {rows} = await pool.query(q, value);
    return rows[0];
}