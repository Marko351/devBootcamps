import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.APP_ENV} mode on port ${PORT}`)
);
