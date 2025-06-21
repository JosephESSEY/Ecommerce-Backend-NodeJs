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
    return execute.rows[0];
}

const addProductCart = async (cart_id, product_id, price) => {
    const query = `INSERT INTO cart_lines(cart_id, product_id, quantity, price)
    VALUES($1, $2, $3, $4) RETURNING *`;
    const values = [cart_id, product_id, 1, price];
    const execute = await pool.query(query, values);
    return execute.rows[0];
}

const verifyProductCart = async (cart_id, product_id) => {
    const query = `SELECT * FROM cart_lines WHERE cart_id = $1 AND product_id = $2`;
    const values = [cart_id, product_id];
    const execute = await pool.query(query, values);
    return execute.rows[0];
}

const setQuantity = async (cart_id, product_id, quantity, price) => {
    const query = `UPDATE cart_lines
    SET quantity = $1, price = $2
    WHERE cart_id = $3 AND product_id = $4 RETURNING *`;
    const values = [quantity, price, cart_id, product_id];
    const execute = await pool.query(query, values);
    return execute.rows[0];
}

const getQuantity = async (cart_id, product_id) => {
    const query = `SELECT quantity 
    FROM cart_lines
    WHERE cart_id = $1 AND product_id = $2`;
    const values = [cart_id, product_id];
    const execute = await pool.query(query, values);
    return execute.rows[0];
}

const deleteProductInCart = async (cart_id, product_id) => {
    const query = `DELETE FROM cart_lines
    WHERE cart_id = $1 AND product_id = $2 RETURNING *`;
    const values = [cart_id, product_id];
    const execute = await pool.query(query, values);
    return execute.rows[0];
}

const setTotalPriceCart = async (total, user_id) => {
    const query = `UPDATE cart
    SET total = $1
    WHERE user_id = $2 RETURNING *`;
    const values = [total, user_id];
    const execute = await pool.query(query, values);
    return execute.rows[0];
}

const getTotalPriceCart = async (cart_id) => {
    const query = `SELECT price 
                   FROM cart_lines
                   WHERE cart_id = $1`;
    const values = [cart_id];
    const result = await pool.query(query, values);
    
    let total = 0;
    result.rows.forEach(row => {
        total += parseInt(row.price) || 0;
    });
    return total;
}


const cartModel = async (user_id) => {
    const query = `SELECT P.id as product_id, P.name as product_name, P.price as unique_price, L.price as prix_total, C.total as prix_total_panier, L.quantity, C.id as card_id
    FROM cart_lines L
    JOIN cart C ON C.id = L.cart_id
    JOIN products P ON p.id = L.product_id
    JOIN users U ON U.id = C.user_id
    WHERE U.id = $1`;
    const value = [user_id];
    const execute = await pool.query(query, value);
    return execute.rows;
}




module.exports = {
    addCart,
    getUserCart,
    addProductCart,
    verifyProductCart,
    setQuantity,
    getQuantity,
    deleteProductInCart,
    cartModel,
    getTotalPriceCart,
    setTotalPriceCart
}