const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

dotenv.config();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API e-commerce');
});

const userRoute = require('./routes/auth.routes.js');

app.use('/api/users', userRoute);


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = app;
