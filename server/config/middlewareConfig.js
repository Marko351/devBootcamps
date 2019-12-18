import morgan from 'morgan';
import fileupload from 'express-fileupload';
import path from 'path';

export default (app, express) => {
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(fileupload());
  app.use(morgan('dev'));
};
