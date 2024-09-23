const notFound = (req, res, next) => {
  res.status(404);
  res.json({ message: "Resource not found" });
};

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};

module.exports = { notFound, errorHandler };
