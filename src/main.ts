import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  console.log(`APP Listening or Port ${AppModule.port}`);
  await app.listen(AppModule.port);
}
bootstrap();
