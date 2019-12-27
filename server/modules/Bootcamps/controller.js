import Bootcamp from './model';
import asyncHandler from '../../utils/asyncHandler';
import ErrorResponse from '../../utils/errorResponse';
import geocoder from '../../utils/geocoder';
import path from 'path';

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps

export const getAllBootcamps = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.advancedResults);
});

// @desc      Get bootcamp
// @route     GET /api/v1/bootcamps/:bootcampId

export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with id of ${bootcampId}`,
        404,
        true
      )
    );
  }
  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Create bootcamp
// @route     POST /api/v1/bootcamps

export const createBootcamp = asyncHandler(async (req, res, next) => {
  const data = { ...req.body };
  data.user = req.user.id;

  //Check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  //If the user is not an admin, he can only add one bootcamp
  if (publishedBootcamp && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user ${req.user.name} has already published a bootcamp`,
        400,
        true
      )
    );
  }

  const bootcamp = await Bootcamp.create(data);

  return res.status(201).json({ success: true, data: bootcamp });
});

// @desc      Update bootcamp
// @route     PATCH /api/v1/bootcamps/:bootcampId

export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;
  const data = { ...req.body };
  let bootcamp = await Bootcamp.findById(bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with id of ${bootcampId}`,
        404,
        true
      )
    );
  }

  // Make shure user is bootcamp owbner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.name} is not authorized to update this bootcamp`,
        401,
        true
      )
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(bootcampId, data, {
    new: true,
    runValidators: true
  });

  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:bootcampId

export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;
  const deletedBootcamp = await Bootcamp.findOne({ _id: bootcampId });

  if (!deletedBootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with id of ${bootcampId}`,
        404,
        true
      )
    );
  }

  // Make shure user is bootcamp owbner
  if (
    deletedBootcamp.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.name} is not authorized to delete this bootcamp`,
        401,
        true
      )
    );
  }

  // trigger delete courses related to bootcamp when delete bootcamp
  deletedBootcamp.remove();
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

// @desc      Upload photo for bootcamp
// @route     PATCH /api/v1/bootcamps/:bootcampId/photo

export const uploadPhoto = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(bootcampId);

  if (!bootcamp) {
    return next(`Bootcamp not found with id of ${bootcampId}`);
  }

  // Make shure user is bootcamp owbner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.name} is not authorized to update this bootcamp`,
        401,
        true
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400, true));
  }

  const file = req.files.file;

  //Make sure that the image is photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400, true));
  }

  //Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${prcess.env.MAX_FILE_UPLOAD} bytes`,
        400,
        true
      )
    );
  }

  // Create Custom Filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500, true));
    }

    await Bootcamp.findByIdAndUpdate(req.params.bootcampId, {
      photo: file.name
    });

    return res.status(200).json({ success: true, data: file.name });
  });
});
