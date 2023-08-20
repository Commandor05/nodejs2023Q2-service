export abstract class LogTransport {
  abstract log(message: string): void;
}

export enum loggerTransports {
  CONSOLE = 'console',
  FILE = 'file',
}

export type LoggerTransport = Record<loggerTransports, string>;

export enum loggerLevels {
  log = 0,
  warn = 1,
  error = 2,
}
