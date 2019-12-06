import morgan from 'morgan';

export default (app, express) => {
  app.use(express.json());
  app.use(morgan('dev'));
};
