import Users from './model';
import asyncHandler from '../../utils/asyncHandler';
import ErrorResponse from '../../utils/errorResponse';
import sendTokenResponse from '../../utils/sendTokenResponse';

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
