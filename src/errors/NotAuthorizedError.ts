import { CustomError } from './CustomError';
import logger from "../utils/logger";

const message = 'Not Authorized';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    logger.error(message)
    return [{ message: message }];
  }
}
