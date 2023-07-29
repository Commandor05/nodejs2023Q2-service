import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import swaggerConf from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;

  const openApiDoc = swaggerConf() as unknown as OpenAPIObject;
  SwaggerModule.setup('doc', app, openApiDoc);

  await app.listen(port);
}
bootstrap();
