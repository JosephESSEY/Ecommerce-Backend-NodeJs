const pool = require('../config/db');

const addOrder = async (user_id, total) => {
    const query = `INSERT INTO orders(user_id, total)
    VALUES($1, $2) RETURNING *`;
    const values = [user_id, total];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const addOrderLine = async (order_id, product_id, quantity, price) => {
    const query = `INSERT INTO order_lines(order_id, product_id, quantity, price)
    VALUES($1, $2, $3, $4) RETURNING *`;
    const values = [order_id, product_id, quantity, price];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const getOrders = async () => {
    const query = `SELECT P.id as product_id, P.name as product_name, P.price as unique_price, L.price as prix_total, O.total as prix_total_panier, L.quantity, O.id as oder_id
    FROM order_lines L
    JOIN orders O ON O.id = L.order_id
    JOIN products P ON P.id = L.product_id`;
    const execute = await pool.query(query);
    return execute.rows;
}

module.exports = {
    addOrder,
    addOrderLine,
    getOrders
}
