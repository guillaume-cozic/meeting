import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from 'express';
import { NotFound } from "../Domain/exception/not.found";

export class NotFoundExceptionFilter implements ExceptionFilter{
    catch(exception: NotFound, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        response
        .status(404)
        .json({
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
    }

}