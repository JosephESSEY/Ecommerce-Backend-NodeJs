const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();


/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User Created with success
 */
router.post("/register", register);
router.post("/login", login);

module.exports = router;
