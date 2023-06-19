import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
  } else if (process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'dev') {
    throw new Error('[NEST] NODE_ENV must be either prod or dev');
  }
  Logger.log(`Running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`, 'Bootsrap');
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Server API')
    .setDescription('API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT);
}
bootstrap();
