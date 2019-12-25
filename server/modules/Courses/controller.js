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
  data.user = req.user.id;

  // Make shure user is bootcamp owbner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.name} is not authorized to add a course to bootcamp ${bootcamp.name}`,
        401,
        true
      )
    );
  }

  const course = await Courses.create(data);
  return res.status(201).json({ success: true, data: course });
});

// @desc      Update course
// @route     PATCH /api/v1/courses/:courseId

export const updateCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  const data = { ...req.body };
  let course = await Courses.findById(courseId);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${courseId}`, 404)
    );
  }

  // Make shure user is bootcamp owbner
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.name} is not authorized to update course ${course.title}`,
        401,
        true
      )
    );
  }

  course = await Courses.findByIdAndUpdate(courseId, data, {
    new: true,
    runValidators: true
  });

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

  // Make shure user is bootcamp owbner
  if (
    deletedCourse.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.name} is not authorized to delete course ${deletedCourse.title}`,
        401,
        true
      )
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
