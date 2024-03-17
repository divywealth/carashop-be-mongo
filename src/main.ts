import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const httpsOptions = {};
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      'http://localhost:8080',
      'https://cara-shop-gamma.vercel.app',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI
  });
  console.log(process.env.NODE_ENV, process.env.JWT_SECRET)
  await app.listen(3000);
}
bootstrap();
