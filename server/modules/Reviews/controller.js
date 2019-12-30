import Reviews from './model';
import { Bootcamps } from '../Bootcamps';
import asyncHandler from '../../utils/asyncHandler';
import ErrorResponse from '../../utils/errorResponse';

// @desc      Get Reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/reviews/:bootcampId/reviews
export const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Reviews.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    return res.status(200).json(res.advancedResults);
  }
});

// @desc      Get Single Reviews
// @route     GET /api/v1/reviews/:reviewId
export const getReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Reviews.findById(reviewId).populate({
    path: 'bootcamp',
    select: 'name, description'
  });

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${reviewId}`, 404, true)
    );
  }

  return res.status(200).json({ success: true, data: review });
});

// @desc      Create Review
// @route     POST /api/v1/reviews/:bootcampId
export const createReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamps.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with id of ${req.params.bootcampId}`,
        404,
        true
      )
    );
  }

  const review = await Reviews.create(req.body);

  return res.status(201).json({ success: true, data: review });
});

// @desc      Update Review
// @route     PATCH /api/v1/reviews/:reviewId
export const updateReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Reviews.findById(reviewId);

  if (!review) {
    return next(
      new ErrorResponse(`No review with id of ${reviewId}`, 404, true)
    );
  }

  // Make shure review belogns to user
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`Not authorized to update review`, 401, true)
    );
  }

  const updatedReview = await Reviews.findByIdAndUpdate(reviewId, req.body, {
    new: true,
    runValidators: true
  });

  return res.status(201).json({ success: true, data: updatedReview });
});

// @desc      Delete Review
// @route     PATCH /api/v1/reviews/:reviewId
export const deleteReview = asyncHandler(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await Reviews.findById(reviewId);

  if (!review) {
    return next(
      new ErrorResponse(`No review with id of ${reviewId}`, 404, true)
    );
  }

  // Make shure review belogns to user
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`Not authorized to delete review`, 401, true)
    );
  }

  const deletedReview = await review.remove();

  return res.status(201).json({ success: true, data: deletedReview });
});
