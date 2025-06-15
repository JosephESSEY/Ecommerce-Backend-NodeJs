const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Middlewares
dotenv.config();
app.use(express.json());

// Routes (placeholder)
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API e-commerce');
});

module.exports = app;
