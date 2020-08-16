import { Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response } from 'express';

import { Error } from 'mongoose';

@Catch(Error.ValidationError)
export class MongooseValidationExceptionHandler implements ExceptionFilter {

  catch(exception: Error.ValidationError, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const invalidFields = [];

    for (const key in exception.errors) {
      const errField = exception.errors[key]
      const err = {
        field: key,
        type: errField.kind,
        message: errField.message
      };

      invalidFields.push(err);
    }

    response
      .status(400)
      .json({
        "statusCode": 400,
        "error": "Bad Request",
        invalidFields
      });

  }

}