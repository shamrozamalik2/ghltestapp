const ApiErrorHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { ApiErrorHandler };