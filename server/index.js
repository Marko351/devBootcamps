import express from 'express';

import routesConfig from './config/routesConfig';
import middlewareConfig from './config/middlewareConfig';
import dbConfig from './config/dbConfig';
import colors from 'colors';

const app = express();

// MongoDB Configuration
dbConfig();

// Middleware Configuration
if (process.env.APP_ENV === 'development') {
  middlewareConfig(app);
}

// Routes Configuration
routesConfig(app);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.APP_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server and exit process
  server.close(() => process.exit(1));
});
