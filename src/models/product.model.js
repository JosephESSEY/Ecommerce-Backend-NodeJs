const pool = require("../config/db")

exports.addProduct = async (name, description, price, stock, image_url, category_id) => {
    const query = `INSERT INTO products(name, description, price, stock, image_url, category_id)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [name, description, price, stock, image_url, category_id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

exports.updateProduct = async (name, description, price, stock, image_url, category_id, id) => {
    const query = `UPDATE products
    SET name = $1,
    description = $2,
    price = $3,
    stock = $4,
    image_url = $5,
    category_id = $6
    WHERE id = $7 RETURNING *`;
    const values = [name, description, price, stock, image_url, category_id, id];
    const product = await pool.query(query, values);
    return product.rows[0];
}

exports.findProductById = async (id) => {
    const query = `SELECT * from products where id = $1`;
    const value = [id];
    const result = await pool.query(query, value);
    return result.rows[0];
}

exports.getAProduct = async (id) => {
    const query = `SELECT P.name as product_name, P.description as product_description, price, stock, C.name as category_name, C.description as category_description
        FROM products P
        JOIN categories C ON C.id = P.category_id
        WHERE P.id = $1`;
    const value = [id];
    const result = await pool.query(query, value);
    return result.rows[0];
}
exports.deleteProduct = async (id) => {
    const query = `DELETE FROM products WHERE id = $1 RETURNING *`;
    const value = [id];
    const execute = await pool.query(query, value);
    return execute.rows[0];
}

exports.allProduct = async () => {
    const query = `SELECT P.name as product_name, P.description as product_description, price, stock, C.name as category_name, C.description as category_description
        FROM products P
        JOIN categories C ON C.id = P.category_id`;
    const execute = await pool.query(query);
    return execute.rows;
}