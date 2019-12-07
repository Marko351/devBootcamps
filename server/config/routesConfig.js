import { SampleRoutes, BootcampRoutes, CoursesRoutes } from '../modules';
import ErrorHandler from '../utils/errorHandler';

export default app => {
  app.use('/api/v1/bootcamps', BootcampRoutes, ErrorHandler);
  app.use('/api/v1/courses', CoursesRoutes, ErrorHandler);
};
