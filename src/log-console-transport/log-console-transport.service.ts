import { Injectable } from '@nestjs/common';
import { EOL } from 'os';
import { LogTransport } from 'src/logging/types';

@Injectable()
export class LogConsoleTransportService extends LogTransport {
  log(message: string): void {
    // if don't work with curent IDE-terminal configuration uncomment next line to check
    // console.log('console: ', message);
    process.stdout.write(message.concat(EOL));
  }
}
