import { CustomError } from './CustomError';
import logger from "../utils/logger";

const message = "Error connecting to database";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;

  constructor() {
    super(message);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    logger.error(message)
    return [{ message: message }];
  }
}
