import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import swaggerConf from './config/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;

  const openApiDoc = swaggerConf() as unknown as OpenAPIObject;
  SwaggerModule.setup('doc', app, openApiDoc);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
}
bootstrap();
