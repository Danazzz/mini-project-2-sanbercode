const express = require('express');
const connectDB = require('./src/config/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const { swaggerUi, specs } = require('./swaggerConfig');
const mainRoutes = require('./src/routes/mainRoutes')

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', mainRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});