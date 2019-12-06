import { SampleRoutes, BootcampRoutes } from '../modules';
import ErrorHandler from '../utils/errorHandler';

export default app => {
  app.use('/api/v1/bootcamps', BootcampRoutes, ErrorHandler);
};
