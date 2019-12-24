import morgan from 'morgan';
import fileupload from 'express-fileupload';
import path from 'path';
import cookieParses from 'cookie-parser';

export default (app, express) => {
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(cookieParses());
  app.use(fileupload());
  app.use(morgan('dev'));
};
