import mongoSanitize from 'express-mongo-sanitize';
import {
  SampleRoutes,
  BootcampRoutes,
  CoursesRoutes,
  AuthRoutes,
  UserRoutes,
  ReviewRoutes
} from '../modules';
import ErrorHandler from '../middleware/errorHandler';

export default app => {
  app.use('/api/v1/bootcamps', mongoSanitize(), BootcampRoutes, ErrorHandler);
  app.use('/api/v1/courses', mongoSanitize(), CoursesRoutes, ErrorHandler);
  app.use('/api/v1/auth', mongoSanitize(), AuthRoutes, ErrorHandler);
  app.use('/api/v1/users', mongoSanitize(), UserRoutes, ErrorHandler);
  app.use('/api/v1/reviews', mongoSanitize(), ReviewRoutes, ErrorHandler);
};
