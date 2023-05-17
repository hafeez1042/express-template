import { ErrorRequestHandler } from "express";
import { CustomError } from "./CustomError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error("Error",err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
}
