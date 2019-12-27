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
  app.use('/api/v1/bootcamps', BootcampRoutes, ErrorHandler);
  app.use('/api/v1/courses', CoursesRoutes, ErrorHandler);
  app.use('/api/v1/auth', AuthRoutes, ErrorHandler);
  app.use('/api/v1/users', UserRoutes, ErrorHandler);
  app.use('/api/v1/reviews', ReviewRoutes, ErrorHandler);
};
