import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import Users from '../modules/Users/model';

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403,
          true
        )
      );
    }
    next();
  };
};

export const protectRoutes = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('hej hou');
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      new ErrorResponse('Not authorized to access this route', 401, true)
    );
  }

  try {
    // Verify toke
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Users.findById(decoded.id);

    return next();
  } catch (error) {
    return next(
      new ErrorResponse('Not authorized to access this route', 401, true)
    );
  }
});
