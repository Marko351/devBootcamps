export default class ErrorResponse extends Error {
  constructor(message, statusCode, externalError) {
    super(message);
    this.statusCode = statusCode;
    this.externalError = externalError;

    Error.captureStackTrace(this, this.constructor);
  }
}
