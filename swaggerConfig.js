const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Project - Book Review API',
      version: '1.0.0',
      description: 'Your API Description',
    },
    servers: [
      {
        url: 'https://mini-project-book-review-api.vercel.app/',
        description: 'Mini Project SanbercodexITB',
      },
    ],
  },
  apis: ['./src/routes/mainRoutes.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
