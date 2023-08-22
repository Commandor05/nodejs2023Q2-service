import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import swaggerConf from './config/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { GeneralExceptionFilter } from './general-exception-filter.filter';
import { LoggingService } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = app.get<LoggingService>(LoggingService);
  app.useGlobalFilters(new GeneralExceptionFilter(httpAdapter, logger));

  process.on('uncaughtExceptionMonitor', (error, origin) => {
    logger.error(`[Uncaught Exception] ${error}, 'origin:', ${origin}`);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`[Unhandled Rejection] ${promise}, 'reason:', ${reason}`);
  });

  const openApiDoc = swaggerConf() as unknown as OpenAPIObject;
  SwaggerModule.setup('doc', app, openApiDoc);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
}
bootstrap();
