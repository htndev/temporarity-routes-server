import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.enableCors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  });

  await app.listen(port);

  Logger.log(`Server running on port ${port}`, 'Bootstrap');
}
bootstrap();
