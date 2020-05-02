module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  const text = (`An error occurred: ${message}`);
  res.status(statusCode).send({ message: text });
  next();
};
