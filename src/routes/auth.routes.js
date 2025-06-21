const express = require("express");
const { register, login, updateUserController, deleteUserController, getProfileController, getAllUsersController } = require("../controllers/auth.controller");
const isAuth = require('../middlewares/verifyToken.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const router = express.Router();


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firtname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created with success
 *       400:
 *         description: Validation error
 */
router.post("/register", register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success login with JWT
 *       401:
 *         description: Incorrect email or password
 */
router.post("/login", login);


/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *       401:
 *         description: Unauthorized – No token provided
 *       403:
 *         description: Forbidden – Admins only
 */
router.get("/all", isAuth, isAdmin, getAllUsersController);


/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get a user's profile by ID of the connected user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get("/profile", isAuth, getProfileController);


/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.put("/update/:id", isAuth, updateUserController);


/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden – Admins only
 */
router.delete("/delete/:id", isAuth, isAdmin, deleteUserController);

module.exports = router;
