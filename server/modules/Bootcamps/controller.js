import Bootcamp from './model';
import asyncHandler from '../../utils/asyncHandler';

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps

export const getAllBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  return res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc      Get bootcamp
// @route     GET /api/v1/bootcamps/:bootcampId

export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(bootcampId);
  if (!bootcamp) {
    return next(`Bootcamp not found with id of ${bootcampId}`);
  }
  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Create bootcamp
// @route     POST /api/v1/bootcamps

export const createBootcamp = asyncHandler(async (req, res, next) => {
  const data = { ...req.body };
  const bootcamp = await Bootcamp.create(data);
  return res.status(201).json({ success: true, data: bootcamp });
});

// @desc      Update bootcamp
// @route     PATCH /api/v1/bootcamps/:bootcampId

export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;
  const data = { ...req.body };
  const bootcamp = await Bootcamp.findByIdAndUpdate(bootcampId, data, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    return next(`Bootcamp not found with id of ${bootcampId}`);
  }
  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:bootcampId

export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;
  const deletedBootcamp = await Bootcamp.findByIdAndDelete(bootcampId);

  if (!deletedBootcamp) {
    return next(`Bootcamp not found with id of ${bootcampId}`);
  }
  return res.status(200).json({ success: true, data: deletedBootcamp });
});
