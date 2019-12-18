export default (err, req, res, next) => {
  let error;
  console.log('Error', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = { message, status: 404 };
  } else if (err.code === 11000) {
    // Mongoose duplicate key
    const message = `Duplicate field value entered`;
    error = { message, status: 400 };
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    const message = Object.values(err.errors).map(val => {
      return { path: val.path, message: val.message };
    });
    error = { message, status: 400 };
  } else if (typeof err === 'string') {
    error = { message: err, status: 404 };
  }

  if (err.externalError) {
    error = { message: err.message, status: err.statusCode };
  }

  return res
    .status(error ? error.status : 500)
    .json({ success: false, error: error || 'Server Error' });
};
