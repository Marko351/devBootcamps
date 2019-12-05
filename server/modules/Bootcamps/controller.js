import Bootcamp from './model';

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps

export const getAllBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    return res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// @desc      Get bootcamp
// @route     GET /api/v1/bootcamps/:bootcampId

export const getBootcamp = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    const bootcamp = await Bootcamp.findById(bootcampId);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

// @desc      Create bootcamp
// @route     POST /api/v1/bootcamps

export const createBootcamp = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const bootcamp = await Bootcamp.create(data);
    return res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

// @desc      Update bootcamp
// @route     PATCH /api/v1/bootcamps/:bootcampId

export const updateBootcamp = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    const data = { ...req.body };
    const bootcamp = await Bootcamp.findByIdAndUpdate(bootcampId, data, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:bootcampId

export const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcampId = req.params.bootcampId;
    const deletedBootcamp = await Bootcamp.findByIdAndDelete(bootcampId);

    if (!deletedBootcamp) {
      return res.status(400).josn({ success: false });
    }
    return res.status(200).json({ success: true, data: deletedBootcamp });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};
