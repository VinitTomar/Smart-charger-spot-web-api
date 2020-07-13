import { NestFactory } from '@nestjs/core';

import * as env from 'dotenv';
env.config();

import { AppModule } from './app.module';
import { MongooseValidationExceptionHandler } from './util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongooseValidationExceptionHandler());
  await app.listen(3000);
}
bootstrap();

