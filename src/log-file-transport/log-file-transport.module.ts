import { Module } from '@nestjs/common';
import { LogFileTransportService } from './log-file-transport.service';

@Module({
  providers: [LogFileTransportService],
  exports: [LogFileTransportService],
})
export class LogFileTransportModule {}
