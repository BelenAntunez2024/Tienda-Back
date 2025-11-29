import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  //validaciones para los DTO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  //cors para el frontend
  app.enableCors({ origin: ['http://localhost:5173', 'https://multiply-thankful-tate.ngrok-free.dev'] });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
