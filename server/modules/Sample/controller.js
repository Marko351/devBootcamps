export const sampleRoute = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, msg: 'Show all bootcamps' });
  } catch (error) {
    return next(error);
  }
};
