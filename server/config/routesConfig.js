import { SampleRoutes, BootcampRoutes } from '../modules';

export default app => {
  app.use('/api/v1/bootcamps', BootcampRoutes);
};
