import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { LoggingService } from './logging/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggingService: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { url, query, body, method } = req;
    const start = Date.now();
    const message = `[Request]URL: ${url}, Method: ${method} , Query prams: ${JSON.stringify(
      query,
    )}, Body:${JSON.stringify(this.loggingService.shadeBodyFields(body))}`;

    next();

    finished(res, () => {
      const ms = Date.now() - start;
      const { statusCode } = res;
      this.loggingService.log(
        `${message}, [Response] Status Code:${statusCode} [${ms}ms]`,
      );
    });
  }
}
