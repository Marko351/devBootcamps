import express from 'express';

import routesConfig from './config/routesConfig';
import middlewareConfig from './config/middlewareConfig';
import dbConfig from './config/dbConfig';
import helmet from 'helmet';
import colors from 'colors';

const app = express();

// Add Security Headers
app.use(helmet())

// MongoDB Configuration
dbConfig();

// Middleware Configuration
middlewareConfig(app, express);

// Routes Configuration
routesConfig(app);

const PORT = process.env.PORT || PORT;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server and exit process
  server.close(() => process.exit(1));
});
