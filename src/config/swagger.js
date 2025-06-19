const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API | Joseph ESSEY (Dev Joseph | Dev Absolu)",
      version: "1.0.0",
      description: "Documentation des routes de l'API e-commerce",
    },
    servers: [{ url: "http://localhost:5000/api" }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
