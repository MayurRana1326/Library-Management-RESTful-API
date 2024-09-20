const createError = require("http-errors");
const { ValidationError } = require("express-validation");
const { getFailureResponse } = require("../utils/response.util");

// Function to extract validation error message
function getValidationErrorMessage(errObject) {
  const { body, params, query } = errObject.details;
  return params?.[0]?.message || query?.[0]?.message || body?.[0]?.message || errObject.message;
}

const notFoundError = (req, res, next) => {
  return next(createError.NotFound("Resource not found."));
};

const mainErrorHandler = (err, req, res, next) => {
  let errStatus;
  let errMessage;
  if (err.status) {
    errStatus = err.status;
    errMessage = err.message;
  } else {
    errStatus = 500;
    errMessage = "Something went wrong";
  }
  // Handle validation errors
  if (err instanceof ValidationError) {
    errStatus = 422;
    errMessage = getValidationErrorMessage(err);
  }

  return res.status(errStatus).json(getFailureResponse(errMessage));
};

module.exports = {
  notFoundError,
  mainErrorHandler,
};
