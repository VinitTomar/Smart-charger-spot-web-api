import { NestFactory } from '@nestjs/core';
import * as env from 'dotenv'; env.config();
import * as cors from 'cors';


import { AppModule } from './app.module';
import { MongooseValidationExceptionHandler } from './util';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useGlobalFilters(new MongooseValidationExceptionHandler());
  await app.listen(3000);
}
bootstrap();

