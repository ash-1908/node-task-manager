const asyncWrapper = (routeFn) => {
  return async(req, res, next) => {
    try {
      await routeFn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = asyncWrapper