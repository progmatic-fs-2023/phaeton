/* eslint-disable no-unused-vars */
export default function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  console.error(
    `\x1b[31m(${req.ip}) ${req.method} ${req.url} (${statusCode}): \x1b[0m${error.message}`,
  );

  res.status(statusCode).send({
    errorCode: statusCode,
    message: error.message,
  });
}
