import { Users } from '../Users';
import asyncHandler from '../../utils/asyncHandler';
// import ErrorResponse from '../../utils/errorResponse';

// @desc      Register User
// @route     GET /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create user
  const user = await Users.create({
    name,
    email,
    password,
    role
  });

  res.status(200).json({ success: true });
});
