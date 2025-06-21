const express = require('express');
const router = express.Router();
const { addProductToCartController, cart, IncreaseQuantity, ReduceQuantity, deleteProductInCartController } = require("../controllers/cart.controller");
const isAuth = require('../middlewares/verifyToken.middleware');


/**
 * @swagger
 * /cart/addProductToCart:
 *   post:
 *     summary: Add a product to a user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - product_id
 *               - price
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 1
 *               product_id:
 *                 type: number
 *                 example: 1
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 29.99
 *     responses:
 *       201:
 *         description: Product added successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.post('/addProductToCart', isAuth, addProductToCartController);


/**
 * @swagger
 * /cart/all:
 *   get:
 *     summary: Cart Items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Cart retrieved successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.get('/all', isAuth, cart);

/**
 * @swagger
 * /cart/delete:
 *   delete:
 *     summary: Delete a product in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart_id
 *               - product_id
 *             properties:
 *               cart_id:
 *                 type: number
 *                 example: 1
 *               product_id:
 *                 type: number
 *                 exemple: 1
 *     responses:
 *       204:
 *         description: Product deleted in cart successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.delete('/delete', isAuth, deleteProductInCartController);

/**
 * @swagger
 * /cart/increase:
 *   put:
 *     summary: Increase Quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart_id
 *               - product_id
 *               - price
 *             properties:
 *               cart_id:
 *                 type: number
 *                 example: 1
 *               product_id:
 *                 type: number
 *                 exemple: 1
 *               price:
 *                 type: number
 *                 exemple: 12000
 *     responses:
 *       200:
 *         description: Quantity updated successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.put('/increase', isAuth, IncreaseQuantity);


/**
 * @swagger
 * /cart/reduce:
 *   put:
 *     summary: Reduce Quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart_id
 *               - product_id
 *               - price
 *             properties:
 *               cart_id:
 *                 type: number
 *                 example: 1
 *               product_id:
 *                 type: number
 *                 exemple: 1
 *               price:
 *                 type: number
 *                 exemple: 12000
 *     responses:
 *       201:
 *         description: Quantity updated Successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.put('/reduce', isAuth, ReduceQuantity);

module.exports = router;