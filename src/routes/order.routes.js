const express = require('express');
const router = express.Router();
const { validateOrder } = require('../controllers/order.controller');
const isAuth = require('../middlewares/verifyToken.middleware');
// const isAdmin = require('../middlewares/isAdmin.middleware');


/**
 * @swagger
 * /order/validation:
 *   post:
 *     summary: Validate an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order added successfuly
 *       400:
 *         description: Invalid datas
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error server
 */
router.post('/validation', isAuth, validateOrder);



module.exports = router;