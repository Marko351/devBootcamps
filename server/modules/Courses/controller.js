import Courses from './model';
import { Bootcamps } from '../Bootcamps';
import asyncHandler from '../../utils/asyncHandler';
import ErrorResponse from '../../utils/errorResponse';

// @desc      Get Bootcamps
// @route     GET /api/v1/courses
// @route     GET /api/v1/courses/:bootcampId/courses
export const getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Courses.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    return res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single course
// @route     GET /api/v1/courses/:courseId

export const getCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Courses.findById(courseId).populate({
    path: 'bootcamp',
    select: 'name description'
  });
  if (!course) {
    return next(new ErrorResponse('cao cao seceru', 422));
  }
  return res.status(200).json({ success: true, data: course });
});

// @desc      Create course
// @route     POST /api/v1/courses/:bootcampId/courses

export const createCourse = asyncHandler(async (req, res, next) => {
  const bootcampId = req.params.bootcampId;

  const bootcamp = await Bootcamps.findById(bootcampId);

  if (!bootcamp) {
    return next(ErrorResponse(`Bootcamp with id ${bootcampId} not found`, 404));
  }
  const data = { ...req.body };
  data.bootcamp = bootcampId;
  const course = await Courses.create(data);
  return res.status(201).json({ success: true, data: course });
});

// @desc      Update course
// @route     PATCH /api/v1/courses/:courseId

export const updateCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  const data = { ...req.body };
  const course = await Courses.findByIdAndUpdate(courseId, data, {
    new: true,
    runValidators: true
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${courseId}`, 404)
    );
  }
  return res.status(200).json({ success: true, data: course });
});

// @desc      Delete course
// @route     DELETE /api/v1/courses/:courseId

export const deleteCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  const deletedCourse = await Courses.findById(courseId);

  if (!deletedCourse) {
    return next(
      new ErrorResponse(`Course not found with id of ${courseId}`, 404)
    );
  }

  await deletedCourse.remove();
  return res.status(200).json({ success: true, data: deletedCourse });
});

// @desc      Delete All Courses
// @route     DELETE /api/v1/courses/all
export const deleteAllCourses = asyncHandler(async (req, res, next) => {
  await Courses.deleteMany({});

  return res
    .status(200)
    .json({ success: true, data: 'You just deleted all courses' });
});

// @desc      Create Many Courses
// @route     POST /api/v1/courses/many
export const createManyCourses = asyncHandler(async (req, res, next) => {
  const data = [...req.body];
  for (let i = 0; i < data.length; i++) {
    let courses = await new Courses(data[i]);
    await courses.save();
  }
  return res.status(201).json({ success: true, data: 'Courses Inserted' });
});
