export default fn => {
  return (req, res, next) => {
    return new Promise((resolve, reject) => {
      resolve(fn(req, res, next));
    }).catch(function(error) {
      return next(error);
    });
  };
};
