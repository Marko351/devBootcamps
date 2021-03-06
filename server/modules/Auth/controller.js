import { Users } from '../Users';
import asyncHandler from '../../utils/asyncHandler';
import ErrorResponse from '../../utils/errorResponse';
import { sendRessetPasswordToken } from '../../utils/mailer/sendRessetPasswordToken';
import crypto from 'crypto';
import sendTokenResponse from '../../utils/sendTokenResponse';

// @desc      Register User
// @route     POST /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create user
  const user = await Users.create({
    name,
    email,
    password,
    role
  });

  sendTokenResponse(user, 200, res);
});

// @desc      Login User
// @route     POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email & password
  if (!email && !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await Users.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credential', 401, true));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credential', 401, true));
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Logout user / clear cookie
// @route     GET /api/v1/auth/logout
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ success: true, data: {} });
});

// @desc      Get current loged in user
// @route     POST /api/v1/auth/current-user
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

// @desc      Forgot Password
// @route     POST /api/v1/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ErrorResponse('There is no user with that email', 404, true)
    );
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/reset-password/${resetToken}`;

  const message = `You are receiving this email because you has requested the reset of a password.
  Please click here to make request: \n\n ${resetUrl}`;

  await sendRessetPasswordToken(
    {
      email: user.email,
      subject: 'Password reset token',
      message
    },
    user,
    next
  );

  sendTokenResponse(user, 200, res);
});

// @desc      Reset Password
// @route     Patch /api/v1/auth/reset-password/:resetToken
export const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await Users.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid Token', 400, true));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ success: true, data: user });
});
