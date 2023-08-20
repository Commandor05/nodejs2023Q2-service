import { Module } from '@nestjs/common';
import { LogConsoleTransportService } from './log-console-transport.service';

@Module({
  providers: [LogConsoleTransportService],
  exports: [LogConsoleTransportService],
})
export class LogConsoleTransportModule {}
