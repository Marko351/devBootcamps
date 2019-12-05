import morgan from 'morgan';
import express from 'express';

export default app => {
  app.use(express.json());
  app.use(morgan('dev'));
};
