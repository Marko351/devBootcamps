import Bootcamp from './model';
import asyncHandler from '../../utils/asyncHandler';
import geocoder from '../../utils/geocoder';

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps

export const getAllBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };
  const removeFields = ['select', 'sort', 'limit', 'page'];
  removeFields.forEach(param => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/, match => `$${match}`);
  query = Bootcamp.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(',');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const bootcamps = await query;

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  return res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps
  });
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

// @desc      Delete All Bootcamps
// @route     DELETE /api/v1/bootcamps/all
export const deleteAllBootcamps = asyncHandler(async (req, res, next) => {
  await Bootcamp.deleteMany({});

  return res
    .status(200)
    .json({ success: true, data: 'You just deleted all bootcamps' });
});

// @desc      Create Many Bootcamps
// @route     POST /api/v1/bootcamps/many
export const createManyBootcamp = asyncHandler(async (req, res, next) => {
  const data = [...req.body];
  for (let i = 0; i < data.length; i++) {
    let bootcamp = await new Bootcamp(data[i]);
    await bootcamp.save();
  }
  return res.status(201).json({ success: true, data: 'Bootcamps Inserted' });
});

// @desc      Get bootcamps within radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance

export const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius
  // Divide distance by radius of Earth
  // Earth Radius = 3963 mi / 6378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  return res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
