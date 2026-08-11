const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  const error = {
    message: err.message || "Something went wrong",
    code: typeof err.code === "number" ? err.code : 500,
    stack: err.stack || "",
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  };
  logEvents(
    `${error.code}\t${error.message}\t${error.path}\t${error.timestamp}`,
    "errLog.txt",
  );

  console.error(error.stack);

  res.status(error.code).json(error);
  next();
};

module.exports = errorHandler;
