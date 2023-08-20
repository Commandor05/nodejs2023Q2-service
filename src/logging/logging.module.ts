import { Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LogConsoleTransportModule } from 'src/log-console-transport/log-console-transport.module';
import { LogFileTransportModule } from 'src/log-file-transport/log-file-transport.module';

@Module({
  imports: [LogConsoleTransportModule, LogFileTransportModule],
  providers: [LoggingService],
})
export class LoggingModule {}
