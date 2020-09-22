import { NestFactory } from '@nestjs/core';
import * as env from 'dotenv'; env.config();
import * as cors from 'cors';


import { AppModule } from './app.module';
import { MongooseValidationExceptionHandler } from './util';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cors());
  app.useGlobalFilters(new MongooseValidationExceptionHandler());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App is running at port: ${port}`);
}
bootstrap();

