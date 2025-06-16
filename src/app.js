const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API e-commerce');
});

const userRoute = require('./routes/auth.routes.js');

app.use('/api/users', userRoute);


module.exports = app;
