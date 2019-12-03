import express from 'express';

import routesConfig from './config/routesConfig';
import middlewareConfig from './config/middlewareConfig';

const app = express();

// Middleware Configuration
if (process.env.APP_ENV === 'development') {
  middlewareConfig(app);
}

// Routes Configuration
routesConfig(app);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.APP_ENV} mode on port ${PORT}`)
);
