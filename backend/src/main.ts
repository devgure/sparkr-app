import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ 
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001', 
      'http://localhost:3002'
    ], 
    credentials: true 
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Sparkr API')
    .setDescription('The Sparkr API documentation')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('matches')
    .addTag('chat')
    .addTag('subscription')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();