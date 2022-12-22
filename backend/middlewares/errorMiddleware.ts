import { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = (error: Error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode).json({
    message: error.message,
  })
}

export default errorHandler
