import Courses from './model';
import asyncHandler from '../../utils/asyncHandler';

// @desc      Get Bootcamps
// @route     GET /api/v1/courses
export const getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Courses.find({});
  return res.status(200).json({ success: true, data: courses });
});

// @desc      Get single course
// @route     GET /api/v1/courses/:courseId

export const getCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Courses.findById(courseId);
  if (!course) {
    return next(`Course not found with id of ${courseId}`);
  }
  return res.status(200).json({ success: true, data: course });
});

// @desc      Create course
// @route     POST /api/v1/courses

export const createCourse = asyncHandler(async (req, res, next) => {
  const data = { ...req.body };
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
    return next(`Course not found with id of ${courseId}`);
  }
  return res.status(200).json({ success: true, data: course });
});

// @desc      Delete course
// @route     DELETE /api/v1/courses/:courseId

export const deleteCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  const deletedCourse = await Courses.findByIdAndDelete(courseId);

  if (!deletedCourse) {
    return next(`Course not found with id of ${courseId}`);
  }
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
