function errorHandler(err, req, res, next) {
  console.log(err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
}

export default errorHandler;
