import { NestFactory } from '@nestjs/core';

import * as env from 'dotenv';
env.config();

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

