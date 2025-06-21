const pool = require("../config/db");

exports.addImageModel = async (image_url, product_id) => {
    const query = `INSERT INTO product_images(image_url, product_id)
                   VALUES($1, $2) RETURNING *`;
    
    const results = await Promise.all(
        image_url.map(async (element) => {
            const values = [element, product_id];
            const { rows } = await pool.query(query, values);
            return rows[0];
        })
    );
    
    return results;
};

exports.deleteImgeModel = async (image_id) => {
    const query = `DELETE FROM product_images WHERE id = $1 RETURNING *`
    const values = [image_id];
    const execute = await pool.query(query, values);
    return execute.rows[0];
}

exports.getImagesByIdModel = async (product_id) => {
    const query = `SELECT * FROM product_images WHERE id = $1`
    const values = [product_id];
    const execute = await pool.query(query, values);
    return execute.rows[0];
}

exports.getImagesByProductModel = async (product_id) => {
    const query = `SELECT * FROM product_images WHERE product_id = $1`
    const values = [product_id];
    const execute = await pool.query(query, values);
    return execute.rows;
}