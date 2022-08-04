class ApiError extends Error {
  constructor (status, message) {
    super()
    this.message = message
    this.status = status
  }
}

const catchError = asyncFn => (req, res, next) => asyncFn(req, res).catch((err) => next(err))

const errorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Internal server error.' } = err
  res.status(status).send(message)
}

module.exports = {
  catchError,
  errorHandler,
  ApiError
}
