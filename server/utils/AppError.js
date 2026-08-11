function AppError(message, code = 500) {
  const error = new Error(message);

  error.code = code;
  error.name = "AppError";

  return error;
}

module.exports = AppError;
