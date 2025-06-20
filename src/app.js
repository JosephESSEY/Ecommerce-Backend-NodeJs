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

const userRoute = require('./routes/auth.routes');
const categoryRoute = require('./routes/category.routes');
const productRoute = require('./routes/product.routes')

app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);

app.use('/uploads', express.static('public/uploads'));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = app;
