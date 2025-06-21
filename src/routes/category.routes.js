const express = require('express');
const router = express.Router();
const {create, update, all, OneCategory, deleteC} = require('../controllers/category.controller');

/**
 * @swagger
 * /categories/this/{id}:
 *   get:
 *     summary: Obtain a category base on his ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Succesful find
 *       404:
 *         description: No found Categorie
 */
router.get('/this/:id', OneCategory);

/**
 * @swagger
 * /categories/all:
 *   get:
 *     summary: Obtain all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/all', all);

/**
 * @swagger
 * /categories/new:
 *   post:
 *     summary: Create a new categorie
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Server error
 */
router.post('/new', create);

/**
 * @swagger
 * /categories/update:
 *   put:
 *     summary: Update a categorie
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - description
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               description: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Not found Category
 *       500:
 *         description: Server Error
 */
router.put('/update', update);

/**
 * @swagger
 * /categories/delete:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Not Found category
 *       500:
 *         description: Server Error
 */
router.delete('/delete', deleteC);


module.exports = router