import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogTransport, loggerLevels } from 'src/logging/types';
import {
  createWriteStream,
  existsSync,
  statSync,
  mkdirSync,
  readdir,
} from 'fs';
import { EOL } from 'os';
import { join } from 'path';

@Injectable()
export class LogFileTransportService extends LogTransport {
  constructor(private configService: ConfigService) {
    super();
  }

  log(message: string, level?: loggerLevels): void {
    const destinationDir = '../../logs';
    this.writeLogToFile(message, destinationDir);
    if (level === loggerLevels.error) {
      const errorsDestinationDir = '../../errors';
      this.writeLogToFile(message, errorsDestinationDir);
    }
  }

  writeLogToFile(message: string, destinationDir: string): void {
    const logFileSiseKbytes = this.configService.get('logger.fileSize');
    const destinationDirPath = join(__dirname, destinationDir);
    if (!existsSync(destinationDirPath)) {
      mkdirSync(destinationDirPath);
    }

    const date = new Date();
    let fileName = `${date.valueOf()}.log`;

    readdir(
      destinationDirPath,
      { withFileTypes: false },
      (err, files: Array<string>) => {
        if (err) {
          return;
        }
        const logFileNames: Array<number> = files.reduce((acc, file) => {
          if (file.endsWith('.log')) {
            acc.push(parseInt(file.replace('.log', '')));
          }
          return acc;
        }, []);

        const sortedLogFileNames = logFileNames.sort((a, b) => b - a);

        if (sortedLogFileNames.length > 0) {
          const lastLogFileName = sortedLogFileNames[0];
          const lestLogFile = `${lastLogFileName}.log`;
          const lastLogFilePath = join(destinationDirPath, lestLogFile);
          const stats = statSync(lastLogFilePath);
          const fileSizeInKbytes = stats.size / 1024;
          if (fileSizeInKbytes < logFileSiseKbytes) {
            fileName = lestLogFile;
          }
        }

        const filePath = join(destinationDirPath, fileName);
        const writeStream = createWriteStream(filePath, { flags: 'a' });

        writeStream.write(message.concat(EOL));
      },
    );
  }
}
