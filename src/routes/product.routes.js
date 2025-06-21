const express = require('express');
const router = express.Router();
const { addP, updateP, deleteP, allP, getP } = require("../controllers/product.controller");
const uploadsFile = require("../middlewares/upload.middleware");
const isAuth = require('../middlewares/verifyToken.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');


/**
 * @swagger
 * /products/addProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "T-shirt coton"
 *               description:
 *                 type: string
 *                 example: "T-shirt 100% coton bio"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 29.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.post('/addProduct', isAuth, isAdmin, uploadsFile.single('image'), addP);


/**
 * @swagger
 * /products/updateProduct/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "T-shirt coton"
 *               description:
 *                 type: string
 *                 example: "T-shirt 100% coton bio"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 29.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product updated successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.put('/updateProduct/:id', isAuth, isAdmin, uploadsFile.single('image'), updateP);

/**
 * @swagger
 * /products/deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       204:
 *         description: Product deleted successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.delete('/deleteProduct/:id', isAuth, isAdmin, deleteP);

/**
 * @swagger
 * /products/allProducts:
 *   get:
 *     summary: List of products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Products
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.get('/allProducts', isAuth, isAdmin, allP);


/**
 * @swagger
 * /products/product/{id}:
 *   get:
 *     summary: Get a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       201:
 *         description: Product find Successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.get('/product/:id', isAuth, isAdmin, getP);

module.exports = router;