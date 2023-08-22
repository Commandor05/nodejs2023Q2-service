import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogConsoleTransportService } from 'src/log-console-transport/log-console-transport.service';
import { LogFileTransportService } from 'src/log-file-transport/log-file-transport.service';
import { LoggerTransport, loggerLevels, loggerTransports } from './types';

@Injectable()
export class LoggingService {
  private transportServicesMap = {
    [loggerTransports.CONSOLE]: this.logConsoleTransportService,
    [loggerTransports.FILE]: this.logFileTransportService,
  };
  constructor(
    private configService: ConfigService,
    private logFileTransportService: LogFileTransportService,
    private logConsoleTransportService: LogConsoleTransportService,
  ) {}

  log(message: string, level: loggerLevels = loggerLevels.log) {
    const activeLogLevel = this.configService.get('logger.level');

    if (activeLogLevel && level < activeLogLevel) {
      return;
    }

    message = level === 0 ? ` [LOG:] ${message}` : message;

    const date = new Date();
    const dateTimePrefix = ` - ${date.toLocaleString()}`;

    this.dispatchLogToTransports(dateTimePrefix.concat(message), level);
  }

  warn(message: string) {
    this.log(` [WARN:] ${message}`, loggerLevels.warn);
  }

  error(message: string) {
    this.log(` [ERROR:] ${message}`, loggerLevels.error);
  }

  shadeBodyFields(body: Record<string, unknown>) {
    const shadowFields = this.configService.get('logger.shadowFields');
    const clonedBody = { ...body };
    for (const key of Object.keys(clonedBody)) {
      if (shadowFields.includes(key)) {
        clonedBody[key] = '*****';
      }
    }

    return clonedBody;
  }

  dispatchLogToTransports(
    message: string,
    level: loggerLevels = loggerLevels.log,
  ) {
    const activeLogTransports = this.configService.get('logger.transports');
    activeLogTransports.forEach((transport: LoggerTransport) => {
      this.transportServicesMap[`${transport}`].log(message, level);
    });
  }
}
