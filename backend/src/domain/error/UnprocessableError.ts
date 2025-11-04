import { AppError } from "./AppError";
import { ErrorType } from "./ErrorType";

export class UnprocessableError extends AppError {
  constructor(message: string) {
    super(message, ErrorType.UNPROCESSABLE_ENTITY);
  }
}
