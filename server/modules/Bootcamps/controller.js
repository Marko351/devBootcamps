// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps

export const getAllBootcamps = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, msg: 'Show all bootcamps' });
  } catch (error) {
    return next(error);
  }
};

// @desc      Get bootcamp
// @route     GET /api/v1/bootcamps/:bootcampId

export const getBootcamp = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    return res
      .status(200)
      .json({ success: true, msg: `Get bootcamp ${bootcampId}` });
  } catch (error) {
    return next(error);
  }
};

// @desc      Create bootcamp
// @route     POST /api/v1/bootcamps

export const createBootcamp = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, msg: 'Create new bootcamp' });
  } catch (error) {
    return next(error);
  }
};

// @desc      Update bootcamp
// @route     PATCH /api/v1/bootcamps/:bootcampId

export const updateBootcamp = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    return res
      .status(200)
      .json({ success: true, msg: `Update bootcamp ${bootcampId}` });
  } catch (error) {
    return next(error);
  }
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:bootcampId

export const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    return res
      .status(200)
      .json({ success: true, msg: `Delete bootcamp ${bootcampId}` });
  } catch (error) {
    return next(error);
  }
};
