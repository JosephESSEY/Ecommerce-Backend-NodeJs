const express = require('express');
const router = express.Router();
const {addImageController, getImagesByProductController, deleteImgeController} = require('../controllers/image.controller');
const uploadsFile = require("../middlewares/upload.middleware");
const isAuth = require('../middlewares/verifyToken.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');


/**
 * @swagger
 * /products/addImages:
 *   post:
 *     summary: Create a new product
 *     tags: [Product Images]
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
 *               - image_url
 *               - product_id
 *             properties:
 *               image_url:
 *                 type: binary
 *               product_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Images add successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.post('/addImages', isAuth, isAdmin, uploadsFile.array('images', 3), addImageController);

/**
 * @swagger
 * /products/deleteImage/{image_id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: image_id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the image
 *     responses:
 *       201:
 *         description: Images delete successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.delete('/deleteImage/:image_id',isAuth, isAdmin, deleteImgeController);

/**
 * @swagger
 * /products/productImages/{product_id}:
 *   get:
 *     summary: Get list images by product
 *     tags: [Product Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *     responses:
 *       201:
 *         description: Images add successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.get('/productImages/:product_id',isAuth, isAdmin, getImagesByProductController);


module.exports = router;