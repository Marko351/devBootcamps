import Users from './model';
import asyncHandler from '../../utils/asyncHandler';

// @desc      Update User Details
// @route     PATCH /api/v1/users/update-details
export const updateUserDetails = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user.id;
  const fieldsToUpdate = {
    name,
    email
  };

  //create user
  const user = await Users.findByIdAndUpdate(userId, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).end();
  // sendTokenResponse(user, 200, res);
});
