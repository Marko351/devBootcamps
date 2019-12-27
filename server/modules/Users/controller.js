import Users from './model';
import asyncHandler from '../../utils/asyncHandler';
import ErrorResponse from '../../utils/errorResponse';
import sendTokenResponse from '../../utils/sendTokenResponse';

// @desc      Get all User
// @route     GET /api/v1/users
export const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single User
// @route     GET /api/v1/users/:userId
export const getSingleUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await Users.findById(userId);

  res.status(200).josn({ success: true, data: user });
});

// @desc      Create User
// @route     POST /api/v1/users
export const createUser = asyncHandler(async (req, res, next) => {
  const user = await Users.create(req.body);

  res.status(200).josn({ success: true, data: user });
});

// @desc      Update User
// @route     PATCH /api/v1/users/:userId
export const updateUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await Users.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).josn({ success: true, data: user });
});

// @desc      Delete User
// @route     DELETE /api/v1/users/:userId
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  await Users.findByIdAndDelete(userId);

  res.status(200).josn({ success: true, data: {} });
});

// @desc      Update User Details
// @route     PATCH /api/v1/users/update-user-details
export const updateUserDetails = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user.id;
  const fieldsToUpdate = {
    name,
    email
  };

  const user = await Users.findByIdAndUpdate(userId, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  return res.status(200).json({ success: true, data: user });
  // sendTokenResponse(user, 200, res);
});

// @desc      Update password
// @route     PATCH /api/v1/users/update-user-password
export const updateUserPassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  const user = await Users.findById(userId).select('+password');

  //Check current password
  if (!(await user.matchPassword(currentPassword))) {
    return next(new ErrorResponse('Password is incorect', 401, true));
  }

  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});
