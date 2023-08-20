import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { DataSource } from 'typeorm';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging/logging.service';
import { LoggingModule } from './logging/logging.module';
import { LoggerMiddleware } from './logger.middleware';
import { LogFileTransportModule } from './log-file-transport/log-file-transport.module';
import { LogConsoleTransportModule } from './log-console-transport/log-console-transport.module';
import loggerConfig from './config/logger.config';
import { APP_FILTER } from '@nestjs/core';
import { GeneralExceptionFilter } from './general-exception-filter.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, loggerConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { ...configService.get('database') };
      },
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    AuthModule,
    LoggingModule,
    LogFileTransportModule,
    LogConsoleTransportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    LoggingService,
    {
      provide: APP_FILTER,
      useClass: GeneralExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
